/** @format */

import React from 'react';
import pre from './footer.css';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaReddit } from 'react-icons/fa';
const Footer = () => {
  return (
    <>
      <footer>
        <div className='footer'>
          <div className='row'>
            <ul>
              <div className='icone'>
                <a
                  href='#'
                  className='logos'>
                  <FaFacebook />
                </a>
                <a
                  href='#'
                  className='logos'>
                  <FaInstagram />
                </a>

                <a
                  href='#'
                  className='logos'>
                  <FaTwitter />
                </a>
                <a
                  href='#'
                  className='logos'>
                  <FaReddit />
                </a>
              </div>
              <li>
                <a href='#'>Contact us</a>
              </li>
              <li>
                <a href='#'>Our Services</a>
              </li>
              <li>
                <a href='#'>Privacy Policy</a>
              </li>
              <li>
                <a href='#'>Terms & Conditions</a>
              </li>
              <li>
                <a href='#'>Career</a>
              </li>
            </ul>
          </div>

          <div className='ending'>
            React Copyright © 2023 - All rights reserved || Designed By: Paolo
            Kessisoglu
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
