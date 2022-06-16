import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBIcon
} from 'mdb-react-ui-kit';
import "./Footer.css";


const Footer = () => (
    <MDBFooter className='text-center text-white' id="f" style={{ backgroundColor: 'rgba(115, 83, 133, 1)' }}>

      <MDBContainer >
        <section  >
          <a className='btn btn-outline-light btn-floating m-1' href='#!' role='button'>
            <MDBIcon fab icon='facebook-f' />
          </a>

          <a className='btn btn-outline-light btn-floating m-1' href='#!' role='button'>
            <MDBIcon fab icon='twitter' />
          </a>
          <a className='btn btn-outline-light btn-floating m-1' href='#!' role='button'>
            <MDBIcon fab icon='instagram' />
          </a>

          <a className='btn btn-outline-light btn-floating m-1' href='#!' role='button'>
            <MDBIcon fab icon='linkedin-in' />
          </a>

          <a className='btn btn-outline-light btn-floating m-1' href='https://github.com/AbnetMeku/Evoting-blockchain' role='button'>
            <MDBIcon fab icon='github' />
          </a>
          <div>
        
        <a className='text-white' href='https://github.com/AbnetMeku/Evoting-blockchain'>
        © 2022 Copyright National Election Board of Ethiopia
        </a>
        </div> 
        </section>
      </MDBContainer>

      
    </MDBFooter>
  );

  

export default Footer;
