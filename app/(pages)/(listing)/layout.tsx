export default async function productLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className='flex px-8 py-7 xl:px-12'>{children}</div>;
}
