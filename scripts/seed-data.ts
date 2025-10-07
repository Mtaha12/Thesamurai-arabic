require('dotenv').config();
import mongoose from 'mongoose';

// Import the model directly to avoid path issues
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/project-phoenix';

// Define the schema and model directly in the script to avoid import issues
const ContentTranslationSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String, 
    required: true,
    trim: true
  },
  content: { 
    type: String, 
    required: true,
    trim: true
  }
}, { _id: false });

const ContentSchema = new mongoose.Schema({
  slug: { 
    type: String, 
    required: true,
    unique: true,
    trim: true
  },
  en: ContentTranslationSchema,
  ar: ContentTranslationSchema,
  category: { 
    type: String, 
    required: true,
    enum: ['blog', 'service', 'page', 'faq'],
    default: 'page'
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, {
  timestamps: true
});

const Content = mongoose.models.Content || mongoose.model('Content', ContentSchema);

const sampleData = [
  {
    slug: 'about-us',
    en: {
      title: 'About Our Company',
      description: 'Learn more about our mission and vision',
      content: 'We are a leading digital solutions provider with years of experience in creating innovative web applications.'
    },
    ar: {
      title: 'من نحن',
      description: 'اعرف المزيد عن مهمتنا ورؤيتنا',
      content: 'نحن مزود رائد للحلول الرقمية مع سنوات من الخبرة في إنشاء تطبيقات الويب المبتكرة.'
    },
    category: 'page'
  },
  {
    slug: 'web-development',
    en: {
      title: 'Web Development Services',
      description: 'Professional web development solutions',
      content: 'We build responsive, scalable web applications using modern technologies like Next.js, React, and Node.js.'
    },
    ar: {
      title: 'خدمات تطوير الويب',
      description: 'حلول تطوير ويب احترافية',
      content: 'نبني تطبيقات ويب مستجيبة وقابلة للتطوير باستخدام تقنيات حديثة مثل Next.js و React و Node.js.'
    },
    category: 'service'
  },
  {
    slug: 'welcome-content',
    en: {
      title: 'Welcome to Our Platform',
      description: 'This is a sample welcome content in English',
      content: 'We provide excellent multilingual digital solutions for your business needs.'
    },
    ar: {
      title: 'مرحبا بكم في منصتنا',
      description: 'هذا محتوى ترحيبي عربي تجريبي',
      content: 'نقدم حلول رقمية متعددة اللغات ممتازة لاحتياجات عملك.'
    },
    category: 'page'
  }
];

async function seedDatabase() {
  try {
    console.log(' Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log(' Connected to MongoDB successfully');

    // Clear existing data
    console.log(' Clearing existing content...');
    await Content.deleteMany({});
    console.log(' Existing content cleared');

    // Insert sample data
    console.log(' Inserting sample data...');
    await Content.insertMany(sampleData);
    console.log('Sample data inserted successfully');

    // Verify insertion
    const count = await Content.countDocuments();
    console.log(` Total documents in database: ${count}`);

    // Display inserted data
    const contents = await Content.find({});
    console.log('\n Inserted Content:');
    contents.forEach(content => {
      console.log(`- ${content.slug} (${content.category})`);
      console.log(`  EN: ${content.en.title}`);
      console.log(`  AR: ${content.ar.title}`);
    });

    console.log('\n Database seeding completed successfully!');

  } catch (error: any) {
    console.error(' Seeding failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the seeding function
seedDatabase();