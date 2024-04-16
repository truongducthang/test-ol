import { LoadingButton } from '@mui/lab';
import { Checkbox, FormControlLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { ReactElement, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible, AiFillLock } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { authActions, LoginPayload, selectIsLogging } from '../authSlice';
const useStyles = makeStyles((theme: any) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  box: {
    padding: theme.spacing(2),
  },
}));

export interface LoginPageProps {
  [key: string]: any;
}

export default function LoginPage(): ReactElement {
  const navigate = useNavigate();

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector(selectIsLogging);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  function handleShowPassword() {
    setShowPassword(!showPassword);
  }
  function onChange(e: any) {
    console.log(`checked = ${e.target.checked}`);
  }
  const { register, handleSubmit } = useForm<any>();
  const onSubmit: SubmitHandler<any> = (data: LoginPayload) => {
    dispatch(authActions.login(data));
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      navigate('/');
    }
  }, [isLogging]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.root}>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="login100-form validate-form"
            >
              <span className="login100-form-logo">LOGO</span>
              <span className="login100-form-title">Đăng nhập</span>
              <div className="wrap-input100 ">
                <input
                  className="input100"
                  placeholder="Email"
                  {...register('email')}
                />
                <span className="focus-input100">
                  <span>
                    <MdEmail color="#fff" />
                  </span>
                </span>
              </div>
              <div className="wrap-input100">
                <input
                  className="input100"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  {...register('password')}
                />
                <span className="focus-input100">
                  <span>
                    <AiFillLock color="#fff" />
                  </span>
                </span>
                <span
                  onClick={handleShowPassword}
                  className="icon-show-password"
                >
                  {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
              </div>
              <div className="contact100-form-checkbox">
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: 20, fill: '#fff' },
                      }}
                      onChange={onChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                      defaultChecked
                    />
                  }
                  label="    Remember me"
                />
              </div>
              <div className="container-login100-form-btn">
                {!isLogging ? (
                  <button type="submit" className="login100-form-btn">
                    Đăng nhập
                  </button>
                ) : (
                  <LoadingButton loading variant="outlined">
                    Submit
                  </LoadingButton>
                )}
              </div>
              <div style={{ paddingTop: '90px', textAlign: 'center' }}>
                <Link className="txt1" to="/reset">
                  Forgot Password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <style>{`
        .txt1 {
          font-size: 13px;
          color: #e5e5e5;
          line-height: 1.5;
        }
        .limiter {
          width: 100%;
          margin: 0 auto;
        }
        .container-login100 {
          background-image: url('https://res.cloudinary.com/ultracard-vn/image/upload/v1629188436/Ultra%20Card/bg-01_phyrh5.jpg');
          width: 100%;
          min-height: 100vh;
          display: -webkit-box;
          display: -webkit-flex;
          display: -moz-box;
          display: -ms-flexbox;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          padding: 15px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          position: relative;
          z-index: 1;
        }
        .container-login100::before {
          content: '';
          display: block;
          position: absolute;
          z-index: -1;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: rgba(255, 255, 255, 0.9);
        }
        .wrap-login100 {
          width: 500px;
          border-radius: 10px;
          overflow: hidden;
          padding: 55px 55px 37px;
          background: #9152f8;
          background: -webkit-linear-gradient(to bottom, #7579ff, #b224ef);
          background: -o-linear-gradient(to bottom, #7579ff, #b224ef);
          background: -moz-linear-gradient(to bottom, #7579ff, #b224ef);
          background: linear-gradient(to bottom, #7579ff, #b224ef);
        }
        .login100-form {
          width: 100%;
        }
        .login100-form-logo {
          font-size: 30px;
          color: #333;
          display: -webkit-box;
          display: -webkit-flex;
          display: -moz-box;
          display: -ms-flexbox;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background-color: #fff;
          margin: 0 auto;
        }
        .login100-form-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          padding-top: 27px;
          padding-bottom: 34px;
          font-size: 30px;
          color: #fff;
          line-height: 1.2;
          text-align: center;
          text-transform: uppercase;
          display: block;
        }
        .wrap-input100 {
          width: 100%;
          position: relative;
          border-bottom: 2px solid rgba(255, 255, 255, 0.24);
          margin-bottom: 30px;
        }
        .input100 {
          font-size: 16px;
          color: #fff;
          line-height: 1.2;
          display: block;
          width: 100%;
          height: 45px;
          background: 0 0;
          padding: 0 5px 0 38px;
        }
        .focus-input100 {
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
        }
        .focus-input100::before {
          content: '';
          display: block;
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          -webkit-transition: all 0.4s;
          -o-transition: all 0.4s;
          -moz-transition: all 0.4s;
          transition: all 0.4s;
          background: #fff;
        }

        .focus-input100 > span {
          font-size:14px;
          color: #fff;
          display: block;
          width: 100%;
          position: absolute;
          top: 13px;
          left: 0;
          padding-left: 5px;
          -webkit-transition: all 0.4s;
          -o-transition: all 0.4s;
          -moz-transition: all 0.4s;
          transition: all 0.4s;
        }
        .input100:focus {
          padding-left: 5px;
        }
        .input100:focus + .focus-input100 > span {
          top: -22px;
          font-size: 18px;
        }
        .input100:focus + .focus-input100::before {
          width: 100%;
        }
        .has-val.input100 + .focus-input100 > span {
          top: -22px;
          font-size: 18px;
        }
        .has-val.input100 + .focus-input100::before {
          width: 100%;
        }
        .has-val.input100 {
          padding-left: 5px;
        }
        .contact100-form-checkbox {
          padding-left: 5px;
          padding-top: 5px;
          padding-bottom: 35px;
          color: #fff;
        }
        .container-login100-form-btn {
          width: 100%;
          display: -webkit-box;
          display: -webkit-flex;
          display: -moz-box;
          display: -ms-flexbox;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .login100-form-btn {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 16px;
          color: #555;
          line-height: 1.2;
          display: -webkit-box;
          display: -webkit-flex;
          display: -moz-box;
          display: -ms-flexbox;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 20px;
          min-width: 120px;
          height: 50px;
          border-radius: 25px;
          background: #9152f8;
          background: -webkit-linear-gradient(to top, #7579ff, #b224ef);
          background: -o-linear-gradient(to top, #7579ff, #b224ef);
          background: -moz-linear-gradient(to top, #7579ff, #b224ef);
          background: linear-gradient(to top, #7579ff, #b224ef);
          position: relative;
          z-index: 1;
          -webkit-transition: all 0.4s;
          -o-transition: all 0.4s;
          -moz-transition: all 0.4s;
          transition: all 0.4s;
        }
        .login100-form-btn::before {
          content: '';
          display: block;
          position: absolute;
          z-index: -1;
          width: 100%;
          height: 100%;
          border-radius: 25px;
          background-color: #fff;
          top: 0;
          left: 0;
          opacity: 1;
          -webkit-transition: all 0.4s;
          -o-transition: all 0.4s;
          -moz-transition: all 0.4s;
          transition: all 0.4s;
        }
        .login100-form-btn:hover {
          color: #fff;
        }
        .login100-form-btn:hover:before {
          opacity: 0;
        }
        .password-input {
          padding: 0 30px 0 38px;
        }
        .icon-show-password {
          font-size: 16px;
          position: absolute;
          right: 6.5px;
          top: 13px;
          color: #fff;
          display: block;
          -webkit-transition: all 0.4s;
          -o-transition: all 0.4s;
          -moz-transition: all 0.4s;
          -webkit-transition: all 0.4s;
          transition: all 0.4s;
        }
        form input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }
        @media (max-width: 576px) {
          .wrap-login100 {
            padding: 55px 15px 37px;
          }
        }
      `}</style>
    </div>
  );
}
