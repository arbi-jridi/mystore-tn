export default async function productLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className='flex px-8 pt-20 pb-7 xl:px-12'>{children}</div>;
}
