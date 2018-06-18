import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import intlEN from 'react-intl/locale-data/en';
import intlFR from 'react-intl/locale-data/fr';

addLocaleData([...intlEN, ...intlFR]);

class LangProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLangLoaded: false,
      locale: props.locale,
      localeData: {}
    }
  }

  componentDidMount() {
    this.fetchLocaleData();
  }

  fetchLocaleData() {
    System.import('../locale/' + this.state.locale).then(({ default: localeData }) => {
      let intlLocaleData = {};
      for (let key in localeData) {
        intlLocaleData[key] = {
          id: key,
          defaultMessage: localeData[key]
        }
      }
      // defineMessages(intlLocaleData);
      this.setState({ isLangLoaded: true, localeData: localeData })
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.locale === this.props.locale) {
      return;
    }

    this.setState({ isLangLoaded: false, locale: nextProps.locale, localeData: {} }, this.fetchLocaleData)
  }

  render() {
    if (!this.state.isLangLoaded) {
      return <h1>Loading Language Files... Please Wait...</h1>
    }

    return (
      <IntlProvider locale={this.state.locale} messages={this.state.localeData}>
        {
          this.props.children
        }
      </IntlProvider>
    )
  }
}

LangProvider.defaultProps = {
  locale: 'en'
};

export default LangProvider;