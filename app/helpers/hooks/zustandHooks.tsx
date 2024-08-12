'use client';

import { useEffect, useState } from 'react';

// aWeekOfExperience : https://www.youtube.com/watch?v=E0fp2KUWRtQ
// set persistent state

const useGetFromStore = <T, F>(
	store: (callback: (state: T) => unknown) => unknown,
	storeCallback: (state: T) => F
) => {
	const result = store(storeCallback) as F;
	const [state, setState] = useState<F>();

	useEffect(() => {
		setState(result);
	}, [result]);
	return state;
};

export { useGetFromStore };
