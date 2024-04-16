import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import React, { ReactElement, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { selectKeysPrivate, tradingBotActions } from './tradingBotSlice';

interface FormKeyConfigProps {}
type Inputs = {
  api_key: string;
  secret_key: string;
};
const useStyles = makeStyles((theme: any) => ({
  root: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--red)',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--green)',
    },
    '& .MuiOutlinedInput-input': {
      color: 'var(--red)',
    },
    '&:hover .MuiOutlinedInput-input': {
      color: 'var(--green)',
    },
    '& .MuiInputLabel-outlined': {
      color: 'var(--red)',
    },
    '&:hover .MuiInputLabel-outlined': {
      color: 'var(--green)',
    },
  },
}));

export function FormKeyConfig({}: FormKeyConfigProps): ReactElement {
  const classes = useStyles();
  // Add these variables to your component to track the state
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [confirm, setComfirm] = useState<boolean>(false);
  const keysPrivate = useAppSelector(selectKeysPrivate);
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      api_key: '',
      secret_key: '',
    },
  });
  useEffect(() => {
    keysPrivate &&
      reset({
        api_key: keysPrivate?.api_key,
        secret_key: keysPrivate?.secret_key,
      });
  }, [keysPrivate]);
  useEffect(() => {
    keysPrivate && setComfirm(true);
  }, [keysPrivate]);

  const onSubmitComfirmKeys: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    if (typeof Storage !== 'undefined') {
      // Khởi tạo sesionStorage
      dispatch(tradingBotActions.changeKeysPrivate(data));
      localStorage.setItem('keysPrivate', JSON.stringify(data));
    } else {
      alert('Trình duyệt của bạn không hỗ trợ!');
    }
    setComfirm(true);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmitComfirmKeys)}>
      <Typography
        sx={{ color: 'var(--primary)' }}
        variant="overline"
        display="block"
        gutterBottom
      >
        Nhập API Key và Secret Key để chạy auto
      </Typography>
      <Box
        sx={{
          border: 1,
          borderColor: 'var(--primary)',
          display: 'flex',
          flexDirection: 'column',
          padding: '0',
        }}
      >
        <Grid container sx={{ '& .MuiTextField-root': { m: 1 } }}>
          <Grid
            item
            xs={12}
            md={5}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <Controller
              rules={{ required: true }}
              control={control}
              name="api_key"
              render={({ field }) => (
                <TextField
                  className={errors.api_key && classes.root}
                  {...field}
                  size="small"
                  sx={{ flexGrow: 1 }}
                  label="API Key"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'} // <-- This is where the magic happens
                  //   onChange={someChangeHandler}
                  InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            {errors.api_key && (
              <Typography
                component="div"
                sx={{
                  color: 'var(--red)',
                  position: 'relative',
                  ml: 2,
                }}
                variant="overline"
                display="block"
              >
                Yêu cầu bắt buộc điền Api key
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <Controller
              rules={{ required: true }}
              control={control}
              name="secret_key"
              render={({ field }) => (
                <TextField
                  className={errors.secret_key && classes.root}
                  {...field}
                  size="small"
                  sx={{ flexGrow: 1 }}
                  label="Secret Key"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'} // <-- This is where the magic happens
                  //   onChange={someChangeHandler}
                  InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            {errors.secret_key && (
              <Typography
                component="div"
                sx={{
                  color: 'var(--red)',
                  position: 'relative',
                  ml: 2,
                }}
                variant="overline"
                display="block"
              >
                Yêu cầu bắt buộc điền Secret key
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 'auto',
            }}
          >
            <LoadingButton
              type="submit"
              sx={{ m: 1, alignSelf: 'flex-end' }}
              loading={false}
              variant={confirm ? 'contained' : 'outlined'}
            >
              {confirm ? 'Đã xác nhận' : 'Xác nhận'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
