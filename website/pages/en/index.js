/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="ara-logo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <Logo img_src={`${baseUrl}img/ara-logo.png`}/>
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl('quick-start.html')}>Get Started</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align={props.blockAlign || 'center'}
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const FeatureCallout = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{textAlign: 'center'}}>
        <h2>Feature Callout</h2>
        <MarkdownBlock>These are features of this project</MarkdownBlock>
      </div>
    );

    const ModernArchitecture = () => (
      <Block id="flexible-architecture" blockAlign="left">
        {[
          {
            content:
              'Nova came up as a base architecture to integrate Micro-frontends in any existing web framework regardless of what programming language it\'s built atop.',
            image: `${baseUrl}img/undraw_to_the_stars.svg`,
            imageAlign: 'left',
            title: 'Flexible Architecture: Nova',
          },
        ]}
      </Block>
    );

    const Description = () => (
      <Block background="dark">
        {[
          {
            content:
              'This is another description of how this project is useful',
            image: `${baseUrl}img/undraw_note_list.svg`,
            imageAlign: 'right',
            title: 'Description',
          },
        ]}
      </Block>
    );

    const CommandLineInterface = () => (
      <Block background="light" id="developer-experience" blockAlign="left">
        {[
          {
            content:
              'Perform common tasks to speed up development cycles such as create Nova services, run them locally and more. \n' +
              '```bash\n$ ara new:nova -t vue /novas/global\n```',
            image: `${baseUrl}img/undraw_web_developer.svg`,
            imageAlign: 'right',
            title: 'Developer Experience: Ara CLI',
          },
        ]}
      </Block>
    );

    const Features = () => (
      <Block layout="threeColumn">
        {[,
          {
            content: 'You can use any JavaScript library to develop your Nova views.',
            image: `${baseUrl}img/undraw_JavaScript_frameworks.svg`,
            imageAlign: 'top',
            title: 'Tech Agnostic',
          },
          {
            content: 'Server-side render Nova views and hydrate them on the browser to make them interactive.',
            image: `${baseUrl}img/undraw_landing_page.svg`,
            imageAlign: 'top',
            title: 'Universal Rendering',
          },
          {
            content: 'You can render Nova views on any web technology and framework such Nuxt, GatsbyJS, Worpdpress, Flask and more.',
            image: `${baseUrl}img/undraw_wordpress.svg`,
            imageAlign: 'top',
            title: 'Consumer Agnostic',
          },
        ]}
      </Block>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl('users.html')}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
          <CommandLineInterface />
          <ModernArchitecture />
        </div>
      </div>
    );
  }
}

module.exports = Index;
