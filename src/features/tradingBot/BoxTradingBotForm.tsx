import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { ActionTradingAuto } from "model/tradingBot";
import React, { ReactElement, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  continueTradingBot,
  createTradingBot,
  deleteActionTradingAuto,
  getAllActionTradingAuto,
  postActionTradingAuto,
  stopTradingBot,
  tradingBotActions,
} from "./tradingBotSlice";
import queryString from 'query-string';

interface BoxTradingBotProps {
  action?: "create" | "update";
  tradingBot?: any;
}
export type TradingBotForm = {
  cryptocurrencies: string;
  trade_size: string;
  percent: string;
  start_price: string;
  end_price: string;
};

export function BoxTradingBotForm({
  action = "create",
  tradingBot,
}: BoxTradingBotProps): ReactElement {
  console.log("tradingBot", action);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<TradingBotForm>({
    defaultValues: {
      cryptocurrencies: "",
      trade_size: "",
      percent: "",
      start_price: "",
      end_price: "",
    },
  });
  useEffect(() => {
    if (tradingBot) {
      reset({
        ...tradingBot,
      });
    }
  }, [tradingBot]);
  if (tradingBot) {
    console.log({ tradingBot });
  }
  const keysPrivate = useAppSelector(
    (state: any) => state.tradingBot.keysPrivate
  );

  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const onSubmitTradingBot: SubmitHandler<TradingBotForm> = React.useCallback(
    (data) => {
      if (action === "create" && !tradingBot) {
        const {
          cryptocurrencies,
          trade_size,
          percent,
          start_price,
          end_price,
        } = data;

        console.log({ keysPrivate });
        if (!keysPrivate) {
          return alert("Chưa nhập API key và Secret key bạn ơi...");
        }

        const { api_key, secret_key } = keysPrivate;

        const formDataAuto: ActionTradingAuto = {
          api_key,
          secret_key,
          tradingBotId: null,
          status: "start",
          cryptocurrencies,
          trade_size: Number(trade_size),
          percent: Number(percent),
          start_price: Number(start_price),
          end_price: Number(end_price),
        };
        dispatch(createTradingBot(formDataAuto));
        dispatch(tradingBotActions.changeTradingAuto("change"));
        // console.log({ formDataAuto });
        // reset();
      }
      if (action === "update") {
        const tradingBotId = tradingBot?._id;

        if (tradingBot?.status === "running") {
          dispatch(stopTradingBot(tradingBotId));
        } else if (tradingBot?.status === "stop") {
          dispatch(continueTradingBot(tradingBotId));
        }
        setTimeout(() => {
          dispatch(
            getAllActionTradingAuto({
            })
          );
        },500);
      }
    },
    [keysPrivate]
  );
  const onReset = () => {
    reset();
  };
  const removeTradingBot = () => {
    dispatch(deleteActionTradingAuto(tradingBot?._id));
    // alert('xoas thanh cong');
  };

  return (
    <Box
      onSubmit={handleSubmit(onSubmitTradingBot)}
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1 },
        padding: "2rem",
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        border: 1,
        borderColor: "var(--running)",
      }}
    >
      {action === "create" && (
        <Typography
          sx={{ textAlign: "center", color: "var(--primary)" }}
          variant="h4"
          gutterBottom
          component="div"
        >
          Nhập form chạy auto ạ
        </Typography>
      )}
      <Grid container>
        <Grid item xs={12} md={12} sx={{ display: "flex" }}>
          <FormControl
            disabled={action !== "create"}
            fullWidth
            sx={{ m: 1 }}
            variant="standard"
          >
            <InputLabel htmlFor="cryptocurrencies">{`Nhập cặp tiền điện tử ( Ví dụ: BTC/USDT )`}</InputLabel>
            <Input
              {...register("cryptocurrencies", {
                required: action === "create" && true,
              })}
              size="small"
              id="cryptocurrencies"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              placeholder="BTC/USDT"
            />
          </FormControl>
        </Grid>

        {!tradingBot && (
          <Grid item xs={12} md={12} sx={{ display: "flex" }}>
            <Typography
              sx={{
                color: "var(--primary)",
                position: "relative",
                top: 10,
                left: 10,
              }}
              variant="overline"
              display="block"
              gutterBottom
            >
              Ô 1: Nhập tiền muốn dùng / 1 giao dịch ------- Ô 2 : Nhập phần
              trăm lãi bán ra. Giá bán khi bán là: 100% + % lãi
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} md={6} sx={{ display: "flex" }}>
          <FormControl
            disabled={action !== "create"}
            fullWidth
            sx={{ m: 1 }}
            variant="standard"
          >
            <InputLabel htmlFor="trade_size">{`Số tiền muốn mua mỗi lần( > 10$) / 1 giao dịch`}</InputLabel>
            <Input
              {...register("trade_size", {
                required: action === "create" && true,
              })}
              size="small"
              id="trade_size"
              type="number"
              placeholder="10"
              inputProps={{
                min: 10,
              }}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: "flex" }}>
          <FormControl
            disabled={action !== "create"}
            fullWidth
            sx={{ m: 1 }}
            variant="standard"
          >
            <InputLabel htmlFor="percent">{`Điền phần trăm lãi mong muốn bán ra.`}</InputLabel>
            <Input
              {...register("percent", {
                required: action === "create" && true,
              })}
              size="small"
              id="percent"
              type="number"
              placeholder="10"
              inputProps={{
                min: 0,
              }}
              startAdornment={
                <InputAdornment position="start">%</InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        {!tradingBot && (
          <Grid item xs={12} md={12} sx={{ display: "flex" }}>
            <Typography
              sx={{
                color: "var(--primary)",
                position: "relative",
                top: 10,
                left: 10,
              }}
              variant="overline"
              display="block"
              gutterBottom
            >
              Nhập khoảng giá muốn mua đồng coin
            </Typography>
          </Grid>
        )}

        <Grid item xs={12} md={12} sx={{ display: "flex" }}>
          <FormControl
            disabled={action !== "create"}
            fullWidth
            sx={{ m: 1 }}
            variant="standard"
          >
            <InputLabel htmlFor="start-price">Giá từ</InputLabel>
            <Input
              {...register("start_price", {
                required: action === "create" && true,
              })}
              size="small"
              id="start-price"
              type="number"
              inputProps={{
                min: 0,
              }}
              placeholder="0.00015"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>

          <FormControl
            disabled={action !== "create"}
            fullWidth
            sx={{ m: 1 }}
            variant="standard"
          >
            <InputLabel htmlFor="end-price">Đến</InputLabel>
            <Input
              {...register("end_price", {
                required: action === "create" && true,
              })}
              size="small"
              id="end-price"
              type="number"
              placeholder="0.00025"
              inputProps={{
                min: 0,
              }}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        {Object.keys(errors).length > 0 && (
          <Grid
            item
            xs={12}
            md={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                color: "var(--red)",
                mt: 3,
                fontSize: "13px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Vui lòng điền đầy đủ form và xác nhận API KEY, Secret Key để auto
            </Typography>
          </Grid>
        )}

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <LoadingButton
            disabled={Object.keys(errors).length > 0}
            type="submit"
            sx={{
              m: 1,
              alignSelf: "flex-end",
              cursor:
                Object.keys(errors).length > 0 ? "pointer" : "not-allowed",
            }}
            loading={false}
            variant={"contained"}
          >
            {action === "create" && "Bắt đầu auto"}
            {action === "update" &&
              (tradingBot?.status === "running"
                ? "Dừng auto"
                : "Tiếp tục auto")}
          </LoadingButton>
          {action === "update" && (
            <Button
              sx={{
                m: 1,
                alignSelf: "flex-end",
                cursor: "pointer",
              }}
              onClick={removeTradingBot}
              variant={"outlined"}
            >
              Xóa trading bot
            </Button>
          )}
          {action === "create" && (
            <Button
              sx={{
                m: 1,
                alignSelf: "flex-end",
                cursor: "pointer",
              }}
              onClick={onReset}
              variant={"outlined"}
            >
              Làm mới form
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
