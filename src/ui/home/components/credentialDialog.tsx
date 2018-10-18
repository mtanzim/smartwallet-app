import React from 'react'
import { StyleSheet, Text, ScrollView, View } from 'react-native'
import { Container, Block } from 'src/ui/structure'
import { DecoratedClaims } from 'src/reducers/account'
import { ClaimCard } from 'src/ui/sso/components/claimCard'
import { JolocomTheme } from 'src/styles/jolocom-theme'
import { prepareLabel } from 'src/lib/util'
import { CredentialTopCard } from './credentialTopCard'

interface Props {
  credentialToRender: DecoratedClaims
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: JolocomTheme.secondaryColorGrey,
    padding: 0
  },
  claimCard: {
    paddingLeft: '15%',
    backgroundColor: JolocomTheme.primaryColorWhite,
  },
  sectionHeader: {
    height: 26,
    fontSize: 17,
    fontFamily: JolocomTheme.contentFontFamily,
    alignSelf: 'flex-start'
  },
  primaryTextStyle: {
    fontSize: JolocomTheme.textStyles.light.fontSize,
    color: JolocomTheme.primaryColorPurple
  },
  secondaryTextStyle: {
    opacity: 1,
    fontSize: JolocomTheme.headerFontSize
  }
})

export const CredentialDialogComponent: React.SFC<Props> = props => {
  const { primaryTextStyle, secondaryTextStyle, sectionHeader, claimCard, container } = styles
  const { credentialToRender } = props
  const { expires, credentialType, issuer } = credentialToRender

  return (
    <Container style={container}>
      <View style={{ padding: '5%', flex: 0.3, width: '95%' }}>
        <CredentialTopCard credentialName={credentialType} expiryDate={expires} />
      </View>
      <Block flex={0.2}>
        <Text style={sectionHeader}> Issued by </Text>
        <ClaimCard
          containerStyle={{ ...StyleSheet.flatten(claimCard), paddingVertical: 5 }}
          primaryTextStyle={primaryTextStyle}
          secondaryTextStyle={secondaryTextStyle}
          primaryText={`${issuer.substring(0, 30)}...`}
          secondaryText={'Name of issuer'}
        />
      </Block>

      <Block flex={0.45}>
        <Text style={{...StyleSheet.flatten(sectionHeader), marginTop: '5%'}}> Document details/claims </Text>
        <ScrollView style={{ width: '100%' }}>
        {renderClaims(credentialToRender)}
        </ScrollView>
      </Block>

      <View flex={0.05} />
    </Container>
  )
}

const renderClaims = (toRender: DecoratedClaims) => {
  const { claimData } = toRender
  return Object.keys(claimData).map(field => (
    <View style={{ marginBottom: 1 }}>
      <ClaimCard
        key={claimData[field]}
        containerStyle={{
          ...StyleSheet.flatten(styles.claimCard),
          paddingVertical: 2
        }}
        primaryText={claimData[field]}
        secondaryText={prepareLabel(field)}
      />
    </View>
  ))
}
