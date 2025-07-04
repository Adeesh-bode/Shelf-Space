import { useSnackbar } from 'notistack';

import axios from 'axios';
import Structure from "../Components/Structure";
import { useParams, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../lib/constants/config';


export default function DeleteBook() {
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async()=>{
      const url = BACKEND_URL + '/books/' + id;
      console.log(url);
      await axios.
        delete(url)
        .then((response)=>{
          console.log(response);
          console.log('Sucessfully Deleted');
          navigate(-1);
          enqueueSnackbar('Book Successful Deleted ',{
            variant : 'success',
            autoHideDuration: 3000,
            anchorOrigin:{ horizontal: 'center' , vertical: 'top' },
            dense:true, 
            // persist: Snackbar stays on the screen, unless it is dismissed (programmatically or through user interaction).Type: booleanDefault: false

          });
        })
        .catch((error)=>{
          console.log(error);
        })
  }

  return (
    <div className='flex flex-col justify-start items-center p-6 md:p-12 w-screen h-screen gap-2 md:gap-5'>
      <Structure heading='Delete Book'/>
      <div className="details border border-sky-500 w-4/5 md:w-1/3 p-4 md:p-8 flex flex-col items-center gap-2">
        <div>Are You Sure You Want to Delete this Book?</div>
        <button onClick={handleSubmit} className='text-indigo-400  w-full' >Delete</button>
      </div>
    </div>
  )
}
