import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { mongoose } from '@/lib/database';

// Chat Message Schema
const chatMessageSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, index: true },
  message: { type: String, required: true },
  response: { type: String, required: true },
  locale: { type: String, default: 'en' },
  userAgent: { type: String },
  ipAddress: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Create model only if it doesn't exist
const ChatMessage = mongoose.models.ChatMessage || mongoose.model('ChatMessage', chatMessageSchema);

// AI Response Generator (can be replaced with actual AI API)
function generateAIResponse(message: string, locale: string, conversationHistory: any[]): string {
  const lowerMessage = message.toLowerCase();
  
  // English responses
  const englishResponses: { [key: string]: string } = {
    greeting: "Hi there! How can I assist you today?",
    help: "I'm here to help! You can ask me about our services, pricing, or any general questions. For specific inquiries, please use our contact form.",
    services: "We offer Cybersecurity Solutions, IT Consulting, Infrastructure Services, and more. Would you like to know more about a specific service?",
    pricing: "Our pricing varies based on your specific needs. Please contact our sales team for a customized quote. Would you like me to connect you?",
    contact: "You can reach us at info@thesamurai.com or call +966 50 123 4567. You can also fill out our contact form for detailed inquiries.",
    thanks: "You're welcome! Is there anything else I can help you with?",
    default: "I understand. For more detailed assistance, please contact our support team or fill out the contact form. Is there anything else I can help with?"
  };

  // Arabic responses
  const arabicResponses: { [key: string]: string } = {
    greeting: "مرحباً! كيف يمكنني مساعدتك اليوم؟",
    help: "أنا هنا للمساعدة! يمكنك أن تسألني عن خدماتنا أو الأسعار أو أي أسئلة عامة. للاستفسارات المحددة، يرجى استخدام نموذج الاتصال الخاص بنا.",
    services: "نحن نقدم حلول الأمن السيبراني، استشارات تكنولوجيا المعلومات، خدمات البنية التحتية، والمزيد. هل تريد معرفة المزيد عن خدمة معينة؟",
    pricing: "تختلف أسعارنا بناءً على احتياجاتك المحددة. يرجى الاتصال بفريق المبيعات لدينا للحصول على عرض أسعار مخصص. هل تريد مني توصيلك؟",
    contact: "يمكنك الوصول إلينا على info@thesamurai.com أو الاتصال على +966 50 123 4567. يمكنك أيضاً ملء نموذج الاتصال للاستفسارات التفصيلية.",
    thanks: "على الرحب والسعة! هل هناك أي شيء آخر يمكنني مساعدتك فيه؟",
    default: "أفهم ذلك. للحصول على مساعدة أكثر تفصيلاً، يرجى الاتصال بفريق الدعم لدينا أو ملء نموذج الاتصال. هل هناك أي شيء آخر يمكنني المساعدة فيه؟"
  };

  const responses = locale === 'ar' ? arabicResponses : englishResponses;

  // Determine response type
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('مرحبا')) {
    return responses.greeting;
  } else if (lowerMessage.includes('help') || lowerMessage.includes('مساعدة')) {
    return responses.help;
  } else if (lowerMessage.includes('service') || lowerMessage.includes('خدمة')) {
    return responses.services;
  } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('سعر')) {
    return responses.pricing;
  } else if (lowerMessage.includes('contact') || lowerMessage.includes('اتصال')) {
    return responses.contact;
  } else if (lowerMessage.includes('thank') || lowerMessage.includes('شكرا')) {
    return responses.thanks;
  } else {
    return responses.default;
  }
}

// POST - Send chat message and get response
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, locale = 'en', conversationHistory = [] } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Generate session ID from headers or create new one
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
    
    // Simple session ID (in production, use proper session management)
    const sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Generate AI response
    const response = generateAIResponse(message.trim(), locale, conversationHistory);

    // Save to database
    try {
      await connectDB();
      
      await ChatMessage.create({
        sessionId,
        message: message.trim(),
        response,
        locale,
        userAgent,
        ipAddress,
        createdAt: new Date()
      });
    } catch (dbError) {
      console.error('Database save error:', dbError);
      // Continue even if DB save fails
    }

    return NextResponse.json({
      success: true,
      response,
      sessionId
    });

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET - Retrieve chat history for a session
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const messages = await ChatMessage.find({ sessionId })
      .sort({ createdAt: 1 })
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: messages,
      count: messages.length
    });

  } catch (error) {
    console.error('Error fetching chat history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chat history' },
      { status: 500 }
    );
  }
}

// Analytics endpoint - Get chat statistics
export async function PATCH(request: NextRequest) {
  try {
    await connectDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = await ChatMessage.aggregate([
      {
        $facet: {
          total: [{ $count: 'count' }],
          today: [
            { $match: { createdAt: { $gte: today } } },
            { $count: 'count' }
          ],
          byLocale: [
            { $group: { _id: '$locale', count: { $sum: 1 } } }
          ],
          uniqueSessions: [
            { $group: { _id: '$sessionId' } },
            { $count: 'count' }
          ]
        }
      }
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalMessages: stats[0]?.total[0]?.count || 0,
        todayMessages: stats[0]?.today[0]?.count || 0,
        byLocale: stats[0]?.byLocale || [],
        uniqueSessions: stats[0]?.uniqueSessions[0]?.count || 0
      }
    });

  } catch (error) {
    console.error('Error fetching chat stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chat statistics' },
      { status: 500 }
    );
  }
}
