import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { Observable } from "rxjs";
import { SubSink } from "subsink";

interface GridItemProps {
	uuid: number;
	start: number;
	path$: Observable<number>;
}

export default function GridItem({ uuid, start, path$ }: GridItemProps) {
	const [found, setFound] = useState(false);

	useEffect(() => {
		const subSink = new SubSink();
		subSink.sink = path$.subscribe((foundNum) => {
			if (foundNum === uuid) {
				setFound(true);
			}
		});

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
