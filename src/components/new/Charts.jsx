import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import Chart from 'react-apexcharts'
import {
  apexColumnChartsone,
  apexMemberBarChart,
  apexSaccoBarChart
} from "../charts/apexCharts/apexData";


const Charts = () => {
    return (
        <Row style={{paddingTop: '2%'}}>
          <Col sm="12" xl="12">
            <Card  style={{boxShadow: '5px 5px 16px #263238'}}>
              <CardHeader>
                <h5>Member Distribution chart</h5>
              </CardHeader>
              <CardBody>
                <div id="basic-bar">
                  <Chart options={apexMemberBarChart.options} series={apexMemberBarChart.series} type="bar" height={350} />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="12">
            <Card  style={{boxShadow: '5px 5px 16px #263238'}}>
              <CardHeader>
                <h5>Sacco Distribution chart</h5>
              </CardHeader>
              <CardBody>
                <div id="basic-bar">
                  <Chart options={apexSaccoBarChart.options} series={apexSaccoBarChart.series} type="bar" height={350} />
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* <Col sm="12" xl="6">
              <Card>
                <CardHeader>
                  <h5>PieChart</h5>
                </CardHeader>
                <CardBody className="apex-chart">
                  <div id="piechart">
                    <Chart options={apexPieChart.options} series={apexPieChart.series} type="pie" width={380} />
                  </div>
                </CardBody>
              </Card>
            </Col> */}
        </Row>
    )
}

export default Charts
