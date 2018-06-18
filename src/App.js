import React from 'react';
import LangProvider from './utils/LangProvider';
import { FormattedMessage, injectIntl } from 'react-intl';

const HelloWorld = injectIntl(function ({ intl }) {
  return (
    <div>
      {intl.formatMessage({ id: 'Hello' })}
      {intl.formatMessage({ id: 'World' })}
      {/* <FormattedMessage id='Hello' />
      <FormattedMessage id='World' /> */}
    </div>
  )
});

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      locale: 'en'
    };
  }

  toggleLocale() {
    this.setState(({ locale }) => {
      return locale === 'fr' ? { locale: 'en' } : { locale: 'fr' }
    })
  }

  render() {
    return (
      <LangProvider locale={this.state.locale}>
        <div style={{ textAlign: 'center' }}>
          <HelloWorld />
          <div>
            <button onClick={this.toggleLocale.bind(this)}>Toggle Locale</button>
          </div>
        </div>
      </LangProvider>
    )
  }
}

export default App;