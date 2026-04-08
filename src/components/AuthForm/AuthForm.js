import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { styleAuthForm } from './StyleAuthForm';

export function AuthForm({ onSubmit, errorMessage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styleAuthForm.container}>
      <View style={styleAuthForm.shell}>
        <View style={styleAuthForm.topDecor}>
          <View style={styleAuthForm.camera} />
          <View style={styleAuthForm.indicatorRow}>
            <View style={styleAuthForm.indicator} />
            <View style={styleAuthForm.indicator} />
            <View style={styleAuthForm.indicator} />
          </View>
        </View>

        <View style={styleAuthForm.card}>
          <Text style={styleAuthForm.subtitle}>
            Rentre tes identifiants pour acceder a ton Pokedex.
          </Text>

          {errorMessage ? <Text style={styleAuthForm.error}>{errorMessage}</Text> : null}

          <View style={styleAuthForm.fieldGroup}>
            <Text style={styleAuthForm.label}>Nom d'utilisateur</Text>
            <TextInput
              style={styleAuthForm.input}
              placeholder="ex: AshKetchum42"
              placeholderTextColor="#A3927F"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styleAuthForm.fieldGroup}>
            <Text style={styleAuthForm.label}>Mot de passe</Text>
            <TextInput
              style={styleAuthForm.input}
              placeholder="********"
              placeholderTextColor="#A3927F"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <Text style={styleAuthForm.helper}>Prêt a capturer quelques Pokemon ?</Text>

          <Pressable
            style={styleAuthForm.button}
            onPress={() => onSubmit(username, password)}
          >
            <Text style={styleAuthForm.buttonText}>Se connecter</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
