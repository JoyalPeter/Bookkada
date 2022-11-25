import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { BookData } from '../../constants/Interfaces';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IEditModal {
  setEditFlag: Function;
  bookData: BookData;
}

export default function EditModal(props: IEditModal) {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState(props.bookData.name);
  const [author, setAuthor] = useState(props.bookData.author);
  const [price, setPrice] = useState(props.bookData.price);
  const [description, setDescription] = useState(props.bookData.description);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseIcon onClick={handleClose} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box>
              Name :
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box>
              Author :
              <TextField
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Box>
            <Box>
              Price :
              <TextField
                type="number"
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
              />
            </Box>
            <Box>
              Discription :
              <TextField
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
            <Button variant="contained" onClick={()=>props.setEditFlag(false)}>Submit</Button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
