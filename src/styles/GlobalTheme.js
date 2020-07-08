const GlobalTheme = {
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    padding: '5%',
    backgroundColor: '#ffffff',
  },
  scrollViewContainer: {
    height: '100%',
    width: '100%',
  },
  drawerHeader: {
    marginStart: 20,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  map: {height: '100%'},
  divider: {
    backgroundColor: 'grey',
    margin: 10,
  },
  headerText: {fontWeight: 'bold', textAlign: 'center', marginTop: 5},
  textInput: {
    width: '100%',
    height: 40,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 4,
  },
  textInputError: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'crimson',
    margin: 10,
  },
  Button: {
    containerStyle: {
      margin: 10,
    },
    titleStyle: {
      color: 'black',
      paddingStart: 10,
      paddingEnd: 10,
    },
    buttonStyle: {
      backgroundColor: '#ffad33',
    },
  },
  Avatar: {
    containerStyle: {
      width: '100%',
      height: 350,
      borderWidth: 1,
      borderColor: '#000000',
    },
    avatarStyle: {
      width: '100%',
      height: '100%',
    },
  },
  Icon: {
    containerStyle: {
      alignItems: 'center',
      opacity: 1,
    },
    iconStyle: {
      marginTop: 10,
      marginBottom: 10,
    },
  },
};

export default GlobalTheme;
