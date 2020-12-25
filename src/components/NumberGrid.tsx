import { Col, Row } from "antd";
import { chunk, range } from "lodash";
import React, { useEffect, useState } from "react";
import GridItem from "./GridItem";
import AdjacencyList from "../service/AdjacencyList";
import { findPath$ } from "../service/store";
import { SubSink } from "subsink";
import { mouseClick$ } from "../interactions";
import { useDispatch } from "react-redux";
import { obstaclesActionCreators } from "../store/Obstacles";

export default function NumberGrid() {
  const [startingNode, setStartingNode] = useState<string>("1");
  // TODO: shift this to redux

  const dispatch = useDispatch();

  useEffect(() => {
    const subSink = new SubSink();
    subSink.sink = mouseClick$.subscribe(({ target }) => {
      // TODO: combine with key down
      let targetElement = target as HTMLElement;
      setStartingNode(targetElement.id);
      dispatch(obstaclesActionCreators.ADD_GRID_ITEM(targetElement.id));
    });
    return () => {
      subSink.unsubscribe();
    };
  }, [dispatch]);

  const adjList = AdjacencyList(10, 10);
  const path$ = findPath$(adjList, parseInt(startingNode));

  if (!path$) {
    return null;
  }

  const grid = range(0, 100, 1);
  const rows = chunk(grid, 10);
  return (
    <>
      {rows.map((cols) => (
        <Row gutter={0}>
          {cols.map((col) => (
            <Col>
              <GridItem
                uuid={col}
                start={parseInt(startingNode)}
                path$={path$}
              />
            </Col>
          ))}
        </Row>
      ))}
    </>
  );
}
