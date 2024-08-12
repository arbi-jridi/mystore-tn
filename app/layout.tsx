import './globals.css';
import Providers from '@/components/Providers';
import Navbar from '@/components/layout/navbar/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
	title: 'My Store',
	description: 'My Store , Votre site e-commerce pour vente des vêtements pour hommes, femmes & enfants'
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<div id='root'>
					<Providers>
						<Navbar />
						{children}
						<Footer />
					</Providers>
				</div>
			</body>
		</html>
	);
}
