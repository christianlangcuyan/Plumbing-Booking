import React from "react";
import { Box, Tab, Tabs, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Link } from 'react-router-dom';

const ReportTabs = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [value, setValue] = React.useState('workorder')


    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    return (
        <Box sx={{ margin: 'auto', width: '63%', ml: '64px', boxShadow: "4" }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs  example"
            >
                <Link to={``}>
                    <Tab value="workorder" label="Work Order" />
                </Link>
                <Link to={`clients`}>
                    <Tab value="client" label="Client History Report" />
                </Link>
                <Link to={`employeereports`}>
                    <Tab value="employee" label="Employee Report" />
                </Link>
                <Link to={`payment`}>
                    <Tab value="payment" label="Transaction Report" />
                </Link>
                <Link to={`quotereports`}>
                    <Tab value="quote" label="Quote History Report" />
                </Link>
            </Tabs>
        </Box >
    )
}
export default ReportTabs