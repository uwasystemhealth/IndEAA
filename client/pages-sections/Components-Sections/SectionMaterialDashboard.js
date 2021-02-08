import React from 'react'

import Table from "components/MaterialKit/Table/Table.js";
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";


const SectionMaterialDashboard = () => {

    return (
        <Card>
            <CardHeader color="warning">
                <h4>Employees Stats</h4>
                <p>
                    New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
                <Table
                    tableHeaderColor="warning"
                    tableHead={["ID", "Name", "Salary", "Country"]}
                    tableData={[
                        ["1", "Dakota Rice", "$36,738", "Niger"],
                        ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                        ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                        ["4", "Philip Chaney", "$38,735", "Korea, South"],
                    ]}
                />
            </CardBody>
        </Card>
    )
}

export default SectionMaterialDashboard
