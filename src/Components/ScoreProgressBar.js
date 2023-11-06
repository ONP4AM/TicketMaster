import React from 'react';
import { Progress, Row, Col } from 'antd';

const ScoreProgressBar = ({ data }) => {

  const scoreMap = {
    Safe: 0,
    Low: 25,
    Moderate: 50,
    Dangerous: 75,
    Critical: 100,
  };

  return (
    <div>
    {data.scores && (
      <Row gutter={16}>
        <Col span={6}>
          <h3>Score: {data.scores.inbound}</h3>
        </Col>
        <Col span={18}>
          <Progress percent={scoreMap[data.scores.inbound]} />
        </Col>
        <Col span={6}>
          <h3>Score: {data.scores.outbound}</h3>
        </Col>
        <Col span={18}>
          <Progress percent={scoreMap[data.scores.outbound]} />
        </Col>
      </Row>
    )}
    </div>
  );
};

export default ScoreProgressBar;
