import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function OrderInfo({ open, handleClose, order ={} }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                ORDER INFORMATION
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ADDRESS: {order.address}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                    AMOUNT: {order.amount}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
}
