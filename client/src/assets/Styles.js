import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    logInContainer: {
        flex: 1,
        backgroundColor: '#4db0f2',
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100,
    },
    title: {
        color: '#FFF',
        marginTop: 10,
        width: 160,
        textAlign: 'center',
        opacity: 0.9,
        fontSize: 30
    },
    currActContainer: {
        flex: 1,
        backgroundColor: '#4db0f2',
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    imageContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logInFormContainer: {
        padding: 20,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginBottom: 10,
        color: '#FFFFFF',
        paddingHorizontal: 10,
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
    },
    clickableText: {
        color: '#FFF',
        textDecorationLine: 'underline',
        textAlign: 'center',
        paddingVertical: 15,
        fontSize: 20,
    },
    signUpContainer:{
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4db0f2',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    signUpInput:{
        width:200,
        height:40,
        fontSize:20,
        color: '#000',

    },
    inputBox:{
        padding: 5,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 280,
        height: 50,
        borderRadius: 8,
        backgroundColor: '#CCFFFF',
        marginBottom: 8,
    },
    button:{
        height: 50,
        width: 280,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#6699CC',
        marginTop: 20,
    },
    btText:{
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },
    dropdown: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
    },
    actAttendantScreenContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 10,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    tabLogo: {
        width: 22,
        height: 22,
    },
});