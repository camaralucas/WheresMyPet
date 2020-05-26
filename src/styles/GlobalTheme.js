const GlobalTheme = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingBottom: 20,
    paddingTop: 20,
    paddingStart: 20,
    paddingEnd: 20,
  },
  drawerHeader: {
    marginStart: 20,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    width: 350,
    height: 40,
    marginTop: 5,
    marginStart: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 4,
  },
  divider: {
    backgroundColor: 'grey',
    marginTop: 10,
  },
  map: {height: '100%'},
  text: {marginStart: 15, marginTop: 5},
  headerText: {fontWeight: 'bold', textAlign: 'center', marginTop: 15},
  errorText: {
    color: 'crimson',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  Button: {
    containerStyle: {
      marginBottom: 10,
      marginTop: 10,
      marginStart: 50,
      marginEnd: 50,
    },
    titleStyle: {
      color: 'black',
    },
    buttonStyle: {
      backgroundColor: '#ffad33',
    },
  },
  Avatar: {
    containerStyle: {
      marginTop: 20,
      marginBottom: 20,
      marginStart: 55,
      borderWidth: 5,
      borderColor: '#000000',
      borderRadius: 20,
      width: 300,
      height: 300,
    },
    avatarStyle: {
      borderRadius: 15,
    },
  },
  Icon: {
    containerStyle: {
      flex: 1,
      alignItems: 'center',
    },
  },
};

export default GlobalTheme;
