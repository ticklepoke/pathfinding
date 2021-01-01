import classnames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Observable } from "rxjs";
import { SubSink } from "subsink";

import { jobActionCreators } from "store/Job";
import { DrawTools, getActivatedTool } from "store/Tools";

interface IGridItemProps {
	uuid: string;
	obstacles: Set<string>;
	start: string;
	end?: string;
	path$?: Observable<string>;
}

const GridItem: React.FC<IGridItemProps> = ({
	uuid,
	start,
	end,
	path$,
	obstacles,
}) => {
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

	// TODO: logic for clashing types
	return (
		<div
			className={classnames(
				"grid-item",
				{ "grid-item-start": start === uuid },
				{ "grid-item-end": end === uuid },
				{ "grid-item-found": found },
				{ "grid-item-obstacle": obstacles.has(uuid) },
				{
					"cursor-cell": selectedTool !== DrawTools.NoTool,
				}
			)}
			id={"grid-item-" + uuid.toString()}
		>
			{uuid}
		</div>
	);
};

export default GridItem;
