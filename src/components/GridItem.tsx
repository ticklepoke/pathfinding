import classnames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Observable } from "rxjs";
import { SubSink } from "subsink";

import { jobActionCreators } from "store/Job";
import { DrawTools, getActivatedTool } from "store/Tools";

interface GridItemProps {
	uuid: number;
	start: number;
	path$: Observable<number> | undefined;
}

export default function GridItem({ uuid, start, path$ }: GridItemProps) {
	const [found, setFound] = useState(false);
	const dispatch = useDispatch();
	const selectedTool = useSelector(getActivatedTool);

	const completeJob = useCallback(() => {
		dispatch(jobActionCreators.FINISH_JOB());
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
		} else {
			setFound(false);
		}
		return () => subSink.unsubscribe();
	});

	return (
		<div
			className={classnames(
				"grid-item",
				{ "grid-item-start": start === uuid },
				{ "grid-item-found": found },
				{
					"cursor-cell": selectedTool !== DrawTools.NoTool,
				}
			)}
			id={uuid.toString()}
		>
			{uuid}
		</div>
	);
}
