import { TouchableOpacity, StyleSheet, Text, Value } from "react-native";
import { colors } from '../global/colors';
import Input from "../components/Input/Input";


const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Input
        label='Email:'
        onChange={null}
        error=''
      />
      <Input
        label='Password:'
        onChange={null}
        error=''
        isSecure={true}
      />
      <TouchableOpacity style={styles.button} onPress={null}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={styles.subtitle}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.subtitleLink}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  button: {
    padding: 10,
    backgroundColor: colors.lightBlue,
    borderRadius: 10,
    margin: 5
  },
  buttonText: {
    color: colors.darkBlue,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  subtitle: {
    color: colors.lightBlue,
    fontSize: 16,
  },
  subtitleLink: {
    color: colors.lightBlue,
    fontSize: 12,
    textDecorationLine: 'underline',
  }


})