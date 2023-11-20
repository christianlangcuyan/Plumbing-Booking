import { Alert, AlertTitle, Box, TextField, Typography, Button, useTheme } from "@mui/material";
import Header from "../../components/Header";
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { tokens } from "../../theme.js";
//start of Marcus' Code

//Dropdown constants for education
const educationOptions = [
    {
        value: 'Journeyman',
        label: 'Journeyman'
    },
    {
        value: 'Apprentice First Year',
        label: 'Apprentice First Year'
    },
    {
        value: 'Apprentice Second Year',
        label: 'Apprentice Second Year'
    },
    {
        value: 'Apprentice Third Year',
        label: 'Apprentice Third Year'
    }
]
//Dropdown constants for employment
const employmentOptions = [
    {
        value: 'Full Time',
        label: 'Full Time'
    },
    {
        value: 'Part Time',
        label: 'Part Time'
    }
]
//dropdown constants for status
const statusOptions = [
    {
        value: 'Active',
        label: 'Active'
    },
    {
        value: 'Inactive',
        label: 'Inactive'
    }
]

export const CreateEmployee = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [ serverError, setServerError ] = useState(false);
    const [ noInput, setNoInput ] = useState(false);
    const minwidth1 = useMediaQuery('(min-width:800px)');
    const minwidth2 = useMediaQuery('(min-width:500px)');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [role, setRole] = useState('');
    const [experience, setExperience] = useState('');
    const [employmentType, setEmploymentType] = useState('');
    const [status, setStatus] = useState('');
    const [password, setPassword] = useState(phone);
    const [startDate, setStartDate] = useState(Date.now());

    dayjs.extend(localizedFormat);
    const navigate = useNavigate();

    const newEmployee = {
        firstName,
        lastName,
        email,
        phone,
        address: {
            street,
            postalCode,
            city,
            province
        },
        role,
        experience,
        startDate,
        employmentType,
        status,
        password: phone
    }

    const handleSave = () => {
        axiosInstance
            .post('/employees', newEmployee)
            .then(() => {
                navigate('/employee')
            }
            )
            .catch((error) => {
                setServerError(false);
                setNoInput(false);
                console.log(error.response.status)
                if (error.response.status === 500) {
                    setServerError(true);
                }
                else if (error.response.status === 400) {
                    setNoInput(true);
                }
            })
    }
    return (
        <Box>
            <Header title="EMPLOYEE" subtitle="NEW EMPLOYEE" />
            <Box m="10px auto" p={"0 0 30px 0"} width={"90%"} >
                <Typography
                    variant="h3"
                    sx={{
                        m: "30px auto 5px auto",
                        width: '80%',
                    }}>
                    Employee Information
                </Typography>
                <Box
                    display="grid"
                    gap="20px"
                    gridTemplateColumns={minwidth1 ? "repeat(2, minmax(0, 1fr))" : minwidth2 ? "repeat(2, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"}
                    sx={{
                        gridColumn: "span 4",
                        margin: "auto",
                        width: '80%',
                    }}
                >
                    <TextField
                        fullWidth
                        required
                        type="text"
                        variant='filled'
                        label="First Name"
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        sx={{ gridColumn: "span 1" }}
                    />

                    <TextField
                        fullWidth
                        required
                        type="text"
                        variant='filled'
                        label="Last Name"
                        name="lastName"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                        fullWidth
                        required
                        type="number"
                        variant='filled'
                        label="Phone"
                        name="phone #"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                        fullWidth
                        required
                        type="text"
                        variant='filled'
                        label="Email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                        fullWidth
                        required
                        type="text"
                        variant='filled'
                        label="Address"
                        name="address"
                        id="address"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                        fullWidth
                        required
                        type="text"
                        variant='filled'
                        label="Postal Code"
                        name="postalCode"
                        id="postalCode"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        sx={{ gridColumn: "span 1" }}
                    />

                    <TextField
                        fullWidth
                        required
                        type="text"
                        variant='filled'
                        label="City"
                        name="city"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                        fullWidth
                        required
                        type="text"
                        variant='filled'
                        label="Province"
                        name="province"
                        id="province"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        sx={{ gridColumn: "span 1" }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            required
                            label='Start Date'
                            renderInput={(params) => <TextField variant="filled" required {...params} />}
                            value={startDate}
                            onChange={(e) => { setStartDate(dayjs(e).toISOString()) }}
                            orientation="landscape"
                        />
                    </LocalizationProvider>
                </Box>

                <Typography
                    variant="h3"
                    sx={{
                        m: "30px auto 5px auto",
                        width: '80%',
                    }}>
                    Education
                </Typography>

                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns={minwidth2 ? "repeat(2, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"}
                    sx={{
                        gridColumn: "span 4",
                        margin: "auto",
                        width: '80%'
                    }}
                >
                    <TextField
                        select
                        required
                        label="Education Level"
                        variant='filled'
                        name="educationLevel"
                        id="education"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        sx={{ gridColumn: "span 1" }}
                    >
                        {educationOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        fullWidth
                        type="number"
                        variant='filled'
                        label="Years of Experience"
                        name="yearsofExperience"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        sx={{ gridColumn: "span 1" }}
                    />
                </Box>

                <Typography
                    variant="h3"
                    sx={{
                        m: "30px auto 5px auto",
                        width: '80%',
                    }}>
                    Hours
                </Typography>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns={minwidth2 ? "repeat(2, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"}
                    sx={{
                        gridColumn: "span 4",
                        margin: "auto",
                        width: '80%',

                    }}
                >
                    <TextField
                        select
                        required
                        label="Employment Type"
                        variant='filled'
                        name="employmentType"
                        id="employmentType"
                        value={employmentType}
                        onChange={(e) => setEmploymentType(e.target.value)}
                        sx={{ gridColumn: "span 1" }}
                    >
                        {employmentOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        required
                        label="Status"
                        variant='filled'
                        name="status"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        sx={{ gridColumn: "span 1" }}
                    >
                        {statusOptions.map((option) => (
                            <MenuItem
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box sx={{width: "30%", margin: "10px auto"}}>
                    {serverError &&
                    <Alert severity="error" >
                        <AlertTitle>Server Error</AlertTitle>
                            Internal Server Error. Please Try Again Later.
                    </Alert>}

                    {noInput &&
                    <Alert severity="warning">
                        <AlertTitle>Warning</AlertTitle>
                            Please Fill Out All Fields
                    </Alert>}
                </Box>
                <div className="flex justify-end mr-36 pt-4">
                    <Button
                        onClick={handleSave}
                        sx={{
                            backgroundColor: colors.redAccent[500],
                            fontWeight: 'bold',
                            fontSize: '13px',
                            width: minwidth1 ? 'auto' : minwidth2 ? '80%' : '100%',
                            borderRadius: '3px'
                        }}
                    >
                        Save and Add
                    </Button>
                </div>
            </Box>
        </Box>
    )
}
export default CreateEmployee
//End of Marcus' code