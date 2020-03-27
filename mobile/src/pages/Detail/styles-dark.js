import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: '#202020',
    },

    header: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center'  
    },

    incident: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#000000',
        marginBottom: 16,
        marginTop: 48,
    },

    incidentProperty: {
        fontSize: 14,
        color: '#E0E0E0',
        marginTop: 24,
        fontWeight: 'bold',
    },

    incidentValue: {
        marginTop: 8,
        fontSize: 15,
        color: '#B6B6BA'
    },

    contactBox: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#000000',
        marginBottom: 16,
    },

    heroTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FFF',
        lineHeight: 30,
    },

    heroDescription: {
        fontSize: 15,
        color: '#EBEBEB',
        marginTop: 16,
    }, 

    actions: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    action: {
        backgroundColor: '#e02041',
        borderRadius: 8,
        height: 50,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    actionText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
});