import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

type Pillar = {
	icon?: string;
	title: string;
	description: string;
};

type ServiceCard = {
	id: string;
	title: string;
	summary: string;
	ctaLabel: string;
	highlights: string[];
	href: string;
};

type ServicesPageProps = {
	params: {
		locale: string;
	};
};

export default async function ServicesPage({ params: { locale } }: ServicesPageProps) {
	const t = await getTranslations('ServicesOverview');
	const localePrefix = `/${locale}`;
	const heroTitle = t('heroTitle');
	const heroSubtitle = t('heroSubtitle');
	const heroSupporting = t('heroSupporting');
	const primaryCta = t('primaryCta');
	const primaryCtaHref = t('primaryCtaHref');
	const secondaryCta = t('secondaryCta');
	const secondaryCtaHref = t('secondaryCtaHref');
	const pillars = (await t.raw('pillars')) as Pillar[];
	const services = (await t.raw('services')) as ServiceCard[];
	const servicesTitle = t('servicesTitle');
	const servicesDescription = t('servicesDescription');
	const ctaTitle = t('ctaTitle');
	const ctaSubtitle = t('ctaSubtitle');
	const ctaPrimary = t('ctaPrimary');
	const ctaPrimaryHref = t('ctaPrimaryHref');
	const ctaSecondary = t('ctaSecondary');
	const ctaSecondaryHref = t('ctaSecondaryHref');
	const supportTitle = t('supportTitle');
	const supportSummary = t('supportSummary');

	const buildHref = (href: string) => {
		if (!href) return '#';
		if (href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://')) {
			return href;
		}
		const normalized = href.startsWith('/') ? href : `/${href}`;
		return `${localePrefix}${normalized}`;
	};

	return (
		<div style={{ background: '#fff', minHeight: '100vh' }}>
			<section
				style={{
					background: 'linear-gradient(135deg, #1a1f71 0%, #0a0e3d 50%, #00bcd4 100%)',
					padding: 'clamp(4rem, 10vw, 7rem) clamp(1.5rem, 6vw, 3.5rem)',
					color: '#fff',
					textAlign: 'center',
					position: 'relative',
					overflow: 'hidden'
				}}
			>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background: 'radial-gradient(circle at 30% 50%, rgba(105, 232, 225, 0.2) 0%, transparent 55%)',
						pointerEvents: 'none'
					}}
				/>
				<div style={{ position: 'relative', zIndex: 1, maxWidth: '920px', margin: '0 auto' }}>
					<h1
						style={{
							fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
							fontWeight: 800,
							marginBottom: '1.25rem'
						}}
					>
						{heroTitle}
					</h1>
					<p
						style={{
							fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
							lineHeight: 1.8,
							opacity: 0.9,
							marginBottom: '1.5rem'
						}}
					>
						{heroSubtitle}
					</p>
					<p
						style={{
							fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
							opacity: 0.85,
							lineHeight: 1.7,
							marginBottom: '2.5rem'
						}}
					>
						{heroSupporting}
					</p>
					<div
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: '1rem',
							justifyContent: 'center'
						}}
					>
						<Link
							href={buildHref(primaryCtaHref)}
							prefetch={false}
							style={{
								background: '#69E8E1',
								color: '#0a0e3d',
								padding: 'clamp(0.85rem, 2vw, 1.05rem) clamp(2.2rem, 4vw, 3rem)',
								borderRadius: '30px',
								fontWeight: 700,
								fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
								textDecoration: 'none',
								boxShadow: '0 15px 38px rgba(105, 232, 225, 0.25)'
							}}
						>
							{primaryCta}
						</Link>
						<Link
							href={buildHref(secondaryCtaHref)}
							prefetch={false}
							style={{
								background: 'transparent',
								color: '#fff',
								border: '2px solid rgba(255,255,255,0.7)',
								padding: 'clamp(0.85rem, 2vw, 1.05rem) clamp(2.2rem, 4vw, 3rem)',
								borderRadius: '30px',
								fontWeight: 600,
								fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
								textDecoration: 'none'
							}}
						>
							{secondaryCta}
						</Link>
					</div>
				</div>
			</section>

			<section
				style={{
					padding: 'clamp(3rem, 8vw, 5.5rem) clamp(1.5rem, 6vw, 3.5rem)',
					maxWidth: '1100px',
					margin: '0 auto'
				}}
			>
				<h2
					style={{
						fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)',
						fontWeight: 800,
						color: '#0a0e3d',
						marginBottom: 'clamp(2rem, 6vw, 3rem)',
						textAlign: 'center'
					}}
				>
					{t('pillarsTitle')}
				</h2>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
						gap: 'clamp(1.5rem, 4vw, 2.5rem)'
					}}
				>
					{pillars.map((pillar, index) => (
						<div
							key={index}
							style={{
								background: '#fff',
								borderRadius: '18px',
								padding: '2rem',
								border: '1px solid rgba(10,14,61,0.08)',
								boxShadow: '0 12px 30px rgba(10, 14, 61, 0.08)'
							}}
						>
							{pillar.icon && (
								<div
									style={{
										width: '56px',
										height: '56px',
										borderRadius: '14px',
										background: '#0a0e3d',
										color: '#69E8E1',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: '1.6rem',
										marginBottom: '1.25rem'
									}}
								>
									{pillar.icon}
								</div>
							)}
							<h3
								style={{
									fontSize: 'clamp(1.15rem, 2vw, 1.35rem)',
									fontWeight: 700,
									color: '#0a0e3d',
									marginBottom: '0.75rem'
								}}
							>
								{pillar.title}
							</h3>
							<p style={{ color: '#555', lineHeight: 1.7 }}>{pillar.description}</p>
						</div>
					))}
				</div>
			</section>

			<section
				style={{
					background: '#0a0e3d',
					padding: 'clamp(3.2rem, 8vw, 6rem) clamp(1.5rem, 6vw, 3.5rem)'
				}}
			>
				<div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
					<h2
						style={{
							fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
							fontWeight: 800,
							color: '#fff',
							marginBottom: '1rem'
						}}
					>
						{servicesTitle}
					</h2>
					<p
						style={{
							color: 'rgba(255,255,255,0.75)',
							maxWidth: '760px',
							margin: '0 auto clamp(2.5rem, 6vw, 3.5rem)',
							lineHeight: 1.8,
							fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)'
						}}
					>
						{servicesDescription}
					</p>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
							gap: 'clamp(1.8rem, 4.5vw, 2.8rem)'
						}}
					>
						{services.map((service) => (
							<div
								key={service.id}
								style={{
									background: '#1a1f71',
									borderRadius: '20px',
									padding: '2.2rem',
									border: '1px solid rgba(105, 232, 225, 0.18)',
									display: 'flex',
									flexDirection: 'column',
									gap: '1rem',
									height: '100%'
								}}
							>
								<h3
									style={{
										fontSize: 'clamp(1.2rem, 2.2vw, 1.4rem)',
										fontWeight: 800,
										color: '#fff'
									}}
								>
									{service.title}
								</h3>
								<p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
									{service.summary}
								</p>
								<ul
									style={{
										listStyle: 'none',
										padding: 0,
										margin: 0,
										display: 'grid',
										gap: '0.6rem',
										color: 'rgba(255,255,255,0.75)',
										textAlign: 'left'
									}}
								>
									{service.highlights.map((item, idx) => (
										<li key={idx}>
											<span style={{ color: '#69E8E1', marginRight: '0.5rem' }}>•</span>
											<span>{item}</span>
										</li>
									))}
								</ul>
								<Link
									href={buildHref(service.href)}
									prefetch={false}
									style={{
										marginTop: 'auto',
										alignSelf: 'flex-start',
										background: '#69E8E1',
										color: '#0a0e3d',
										padding: '0.75rem 1.9rem',
										borderRadius: '24px',
										fontWeight: 600,
										fontSize: '0.95rem',
										textDecoration: 'none'
									}}
								>
									{service.ctaLabel}
								</Link>
							</div>
						))}
					</div>
				</div>
			</section>

			<section
				style={{
					padding: 'clamp(3.2rem, 8vw, 6rem) clamp(1.5rem, 6vw, 3.5rem)',
					background: '#f8f9fa'
				}}
			>
				<div
					style={{
						maxWidth: '1020px',
						margin: '0 auto',
						background: '#fff',
						borderRadius: '24px',
						padding: 'clamp(2.5rem, 6vw, 3.5rem)',
						boxShadow: '0 20px 45px rgba(10, 14, 61, 0.08)',
						textAlign: 'center'
					}}
				>
					<h3
						style={{
							fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
							fontWeight: 800,
							color: '#0a0e3d',
							marginBottom: '1rem'
						}}
					>
						{ctaTitle}
					</h3>
					<p
						style={{
							fontSize: 'clamp(0.98rem, 1.6vw, 1.05rem)',
							color: '#555',
							lineHeight: 1.8,
							marginBottom: '2rem'
						}}
					>
						{ctaSubtitle}
					</p>
					<div
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							justifyContent: 'center',
							gap: '1rem'
						}}
					>
						<Link
							href={buildHref(ctaPrimaryHref)}
							prefetch={false}
							style={{
								background: '#0a0e3d',
								color: '#fff',
								padding: '0.85rem 2.6rem',
								borderRadius: '30px',
								fontWeight: 700,
								fontSize: '0.95rem',
								textDecoration: 'none',
								boxShadow: '0 15px 36px rgba(10, 14, 61, 0.18)'
							}}
						>
							{ctaPrimary}
						</Link>
						<Link
							href={buildHref(ctaSecondaryHref)}
							prefetch={false}
							style={{
								color: '#00bcd4',
								fontWeight: 600,
								fontSize: '0.95rem',
								textDecoration: 'none'
							}}
						>
							{ctaSecondary}
						</Link>
					</div>
				</div>
			</section>

			<section
				style={{
					padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 6vw, 3.5rem)',
					textAlign: 'center'
				}}
			>
				<h4
					style={{
						fontSize: 'clamp(1.4rem, 3vw, 2rem)',
						fontWeight: 800,
						color: '#0a0e3d',
						marginBottom: '1rem'
					}}
				>
					{supportTitle}
				</h4>
				<p
					style={{
						color: '#666',
						lineHeight: 1.8,
						maxWidth: '760px',
						margin: '0 auto'
					}}
				>
					{supportSummary}
				</p>
			</section>
		</div>
	);
}
