import React, { useEffect, useState } from 'react';
import { Box, Button, useTheme, Typography} from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tokens } from "../../theme";
import axiosInstance from '../../axiosInstance';
import Spinner from 'react-bootstrap/Spinner';
import Header from '../../components/Header';

export const DeleteWorkOrder = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams('');
  const navigate = useNavigate();
  const [workOrder, setWorkOrder] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/workorders/${id}`)
      .then((response) => {
        setWorkOrder(response.data)
        setLoading(false);
        console.log(workOrder);
      }
      )
      .catch((error) => {
        setLoading(false);
        console.log(error)
      });
  }, [id]);

  const handleDeleteWorkOrder = () => {
    axiosInstance
      .delete(`/workorders/${id}`)
      .then(() => {
        axiosInstance
          .delete(`/schedule/${id}`)
          .then(() => {
            navigate('/workorder')
          })
      })
      .catch((error) =>
        console.log(error)
      );
  };

  return (<div>
    <Header title={"WORK ORDER"} subtitle={"DELETE WORK ORDER"} />
    {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (
      <Box m="30px">
        <Box sx={{ width: "90%", margin: "auto", boxShadow: '4', border: 'solid', borderWidth: "2px", borderRadius: '5px' }}>
          <Typography variant="h2" fontWeight="bold" sx={{ mb: "5%", mt: '2%', textAlign: "center" }}>Delete Work Order?</Typography>
          <div className='m-10'>
            <div className='text-xl pl-2 pb-4'>
              <span className='font-light'>Title: </span>
              <span className='font-bold'>{workOrder.title}</span>
            </div>
            <div className='text-xl pl-2 pb-4'>
              <span className='font-light'>Description: </span>
              <span className='font-bold'>{workOrder.description}</span>
            </div>
            <div className='text-xl pl-2 pb-4'>
              <span className='font-light'>Start Date: </span>
              <span className='font-bold'>{workOrder.startDate}</span>
            </div>
            <div className='text-xl pl-2 pb-4'>
              <span className='font-light'>End Date: </span>
              <span className='font-bold'>{workOrder.endDate}</span>
            </div>
            <div className='text-xl pl-2 pb-4'>
              <span className='font-light'>Cost: </span>
              <span className='font-bold'>${workOrder.cost}</span>
            </div>
            <div className='text-xl pl-2 pb-4'>
              <span className='font-light'>Address: </span>
              <span className='font-bold'>{workOrder.address.street}</span>
            </div>
            <div className='text-xl pl-2 pb-4'>
              <span className='font-light'>Business name: </span>
              <span className='font-bold'>{workOrder.busName}</span>
            </div>
          </div>
        </Box>
        <Box display="flex" justifyContent="space-between" sx={{ width: '20%', margin: 'auto', pt: '2%' }}>
          <Link to={'/workorder'}>
            <Button sx={{
              backgroundColor: colors.greenButton,
              fontWeight: 'bold',
              fontSize: '13px',
            }}
            >No, Go Back</Button>
          </Link>
          <Button sx={{
            backgroundColor: colors.redButton,
            fontWeight: 'bold',
            fontSize: '13px',
          }} onClick={handleDeleteWorkOrder} >Yes, Im Sure</Button>
        </Box>
      </Box>
    )}
  </div >
  )
}

export default DeleteWorkOrder