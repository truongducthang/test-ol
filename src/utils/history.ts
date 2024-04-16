import { createBrowserHistory } from "history";

export interface BrowserRouterProps {
    basename?: string;
    children?: React.ReactNode;
    window?: Window;
  }
  
export const history = createBrowserHistory()
