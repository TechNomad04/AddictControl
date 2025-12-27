import { View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { useState } from 'react';
import COLORS from '@/constants/color';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  onSubmit: (uri: string) => void;
};

export default function AudioQuestionCard({ onSubmit }: Props) {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
    } catch (err) {
      console.log('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();

    setAudioUri(uri || null);
    setRecording(null);
  };

  return (
    <View
      style={{
       backgroundColor: COLORS.cardBackground,
           borderRadius: 16,
           padding: 24,
           shadowColor: COLORS.black,
           shadowOffset: { width: 0, height: 2 },
           shadowOpacity: 0.1,
           shadowRadius: 8,
           elevation: 4,
           borderWidth: 2,
           borderColor: COLORS.border,
           marginTop: -24,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: '600' }}>
        Final Question
      </Text>

      <Text style={{ marginTop: 10 }}>
        Please answer this question using your voice.
      </Text>

      <TouchableOpacity
        onPress={recording ? stopRecording : startRecording}
        style={{
          backgroundColor: recording ? '#dc2626' : '#00bcd4',
          padding: 14,
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>
          {recording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </TouchableOpacity>

      {audioUri && (
        <TouchableOpacity
          onPress={() => onSubmit(audioUri)}
          style={{
            padding: 14,
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <LinearGradient
              colors={ ['#52d4f5', '#4ee3f7ff']}
              start={[0, 0]}
              end={[1, 1]}
              style={{ padding: 15, justifyContent: 'center', alignItems: 'center' }}
            >
          <Text style={{ color: '#fff', textAlign: 'center' }}>
            Submit Audio Answer
          </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
}
