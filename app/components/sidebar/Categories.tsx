'use client';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

type Props = {
	categories: ProductAll[] | undefined;
	store: {
		selected: string[];
		setSelected: (selected: string[]) => void;
	};
};

const Categories = ({ categories, store }: Props) => {
	const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		const isChecked = (e.target as HTMLInputElement).checked;

		store.setSelected(
			isChecked
				? [...store.selected, value]
				: store.selected.filter((item) => item !== value)
		);
	};

	return (
		<div className='mb-7'>
			<h2 className='mb-5 pr-8 text-2xl'>Categories</h2>
			{categories?.map((item, index) => (
				<FormControlLabel
					key={index}
					sx={{ display: 'block' }}
					control={
						<Checkbox
							id={`${item.id}`}
							value={item.id}
							checked={!!store.selected.find((el) => el === item.id.toString())}
							onChange={handleChange}
						/>
					}
					label={item.attributes.title}
				/>
			))}
		</div>
	);
};

export default Categories;
