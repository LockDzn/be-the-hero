import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';
import logoDImg from '../../assets/logo-dark.png';
import styles from './styles';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const theme = route.params.theme;
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}.`;

    function navigationBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return (
        <View style={[styles.container, {backgroundColor: theme ? '#E5E5E5' : '#202020'}]}>
            <View style={styles.header}>
                <Image source={theme ? logoImg : logoDImg} />
                <TouchableOpacity onPress={navigationBack}>
                    <Feather name="arrow-left" size={28} color="#e82041"/>
                </TouchableOpacity>
            </View>

            <View style={[styles.incident, {backgroundColor: theme ? '#fff' : '#000000'}]}>
                <Text style={[styles.incidentProperty, { marginTop:0, color: theme ? '#41414D' : '#E0E0E0' }]}>ONG:</Text>
                <Text style={[styles.incidentValue, {color: theme ? '#737380' : '#B6B6BA'}]}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={[styles.incidentProperty, {color: theme ? '#41414D' : '#E0E0E0'}]}>CASO:</Text>
                <Text style={[styles.incidentValue, {color: theme ? '#737380' : '#B6B6BA'}]}>{incident.title}</Text>

                <Text style={[styles.incidentProperty, {color: theme ? '#41414D' : '#E0E0E0'}]}>VALOR:</Text>
                <Text style={[styles.incidentValue, {color: theme ? '#737380' : '#B6B6BA'}]}>
                    {Intl.NumberFormat('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                    }).format(incident.value)}
                </Text>
            </View>

            <View style={[styles.contactBox, {backgroundColor: theme ? '#fff' : '#000000'}]}>
                <Text style={[styles.heroTitle, {color: theme ? '#13131a' : '#fff'}]}>Salve o dia!</Text>
                <Text style={[styles.heroTitle, {color: theme ? '#13131a' : '#fff'}]}>Seja o herói desse caso.</Text>

                <Text style={[styles.heroDescription, {color: theme ? '#737380' : '#B6B6BA'}]}>Entre em contato!</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}