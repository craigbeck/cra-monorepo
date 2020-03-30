import * as React from "react";
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider, styled} from 'baseui';
export { Button } from "baseui/button";


const engine = new Styletron();

// export interface ThemeProps {
//   children: React.ReactNode,
// }

export function ThemeProvider(props) {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        {props.children}
      </BaseProvider>
    </StyletronProvider>
  );
}
