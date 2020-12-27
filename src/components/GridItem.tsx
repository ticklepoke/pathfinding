import classnames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Observable } from "rxjs";
import { SubSink } from "subsink";

import { jobActionCreators } from "store/Job";

interface GridItemProps {
	uuid: number;
	start: number;
	path$: Observable<number> | undefined;
}

export default function GridItem({ uuid, start, path$ }: GridItemProps) {
	const [found, setFound] = useState(false);
	const dispatch = useDispatch();

	const completeJob = useCallback(() => {
		dispatch(jobActionCreators.STOP_JOB());
	}, [dispatch]);

	useEffect(() => {
		const subSink = new SubSink();
		if (path$) {
			subSink.sink = path$.subscribe(
				(foundNum) => {
					if (foundNum === uuid) {
						setFound(true);
					}
				},
				null,
				completeJob
			);
		}
		return () => subSink.unsubscribe();
	});

	return (
		<div
			className={classnames(
				"grid-item",
				{ "grid-item-start": start === uuid },
				{ "grid-item-found": found }
			)}
			id={uuid.toString()}
		>
			{uuid}
		</div>
	);
}
