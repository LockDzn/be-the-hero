import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';
import logoImg from '../../assets/logo.png';
import logoDImg from '../../assets/logo-dark.png';
import styles from './styles';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [theme, setTheme] = useState(false);
    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident, theme});
    }

    async function loadIncidents(){
        if (loading) {
            return;
        }

        if (total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });
        setIncidents([ ... incidents, ... response.data.incidents]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, [])
    
    function toggleTheme() {
        if (theme){
            setTheme(false);
        } else {
            setTheme(true);
        }
        
    }

    return (
        <View style={[styles.container, {backgroundColor: theme ? '#E5E5E5' : '#202020'}]}>
            <View style={styles.header}>
                <Image source={theme ? logoImg : logoDImg}/>
                <Text style={[styles.headerText, {color: theme ? '#737380' : '#EBEBEB'}]}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>
            <TouchableOpacity 
                    style={[styles.headerTheme, {color: theme ? 'white' : 'black'}]}
                    onPress={toggleTheme}
            >
                <Feather name={theme ? 'moon' : 'sun'} size={16} color="#E02041"/>
            </TouchableOpacity>

            <Text style={[styles.title, {color: theme ? '#13131a' : '#fff'}]}>Bem-vindo!</Text>
            <Text style={[styles.description, {color: theme ? '#13131a' : '#EBEBEB'}]}>Escolha um dos casos a baixo e salve o dia.</Text>

            <FlatList
                style={styles.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incidentList}>
                        <View style={[styles.incident, {backgroundColor: theme ? '#fff' : '#000000'}]}>
                            <Text style={[styles.incidentProperty, {color: theme ? '#41414D' : '#E0E0E0'}]}>ONG:</Text>
                            <Text style={[styles.incidentValue, {color: theme ? '#737380' : '#B6B6BA'}]}>{incident.name}</Text>

                            <Text style={[styles.incidentProperty, {color: theme ? '#41414D' : '#E0E0E0'}]}>CASO:</Text>
                            <Text style={[styles.incidentValue, {color: theme ? '#737380' : '#B6B6BA'}]}>{incident.title}</Text>

                            <Text style={[styles.incidentProperty, {color: theme ? '#41414D' : '#E0E0E0'}]}>VALOR:</Text>
                            <Text style={[styles.incidentValue, {color: theme ? '#737380' : '#B6B6BA'}]}>
                                {Intl.NumberFormat('pt-BR', { 
                                    style: 'currency', 
                                    currency: 'BRL' 
                                }).format(incident.value)}
                            </Text>

                            <TouchableOpacity 
                                style={styles.detailsButtom} 
                                onPress={() => navigateToDetail(incident)}
                            >
                                <Text style={styles.detailsButtomText}>Ver mais detalhes</Text>
                                <Feather name="arrow-right" size={16} color="#E02041"/>
                            </TouchableOpacity>

                        </View>
                    </View>
                )}
            />
        </View>
    );
}
