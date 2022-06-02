import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const [ data, setData ] = React.useState("")
    const [ bill ,setBill] = React.useState(0)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const onHandleSubmit = () => {
        if(data == Math.abs(parseInt(data))){
            let validValue = parseInt(data)
            let index = 1;
            let sum = 0;
            while(validValue > 0) {
                if(validValue < 99){
                    sum += (validValue * (index > 3  ? 5 : index))
                    break;
                }
                validValue -= 100;
                if(index > 3){
                  sum += (100 * 5)
                } else if(index === 3) {
                    sum += (100 * 3);
                } else if(index === 2) {
                    sum += (100 * 2);
                } else{
                    sum += (100 * 1)
                }
                index++;
            }
            setBill(sum)
        }else{
            alert("Enter Valid Value")
        }
    }
    return (
        <div>
            <Button onClick={handleOpen}>Calculate Bill</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <input type="Number" value={data} onChange={(e) => setData(e.target.value)}/>
                    <button onClick={onHandleSubmit}>Calculate</button>
                    <div>
                        Total Bill: {bill}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}