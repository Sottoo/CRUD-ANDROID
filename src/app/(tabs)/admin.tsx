import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useScreenings } from '@/hooks/useScreenings';
import { ScreeningList } from '@/components/screening/ScreeningList';
import { Button } from '@/components/ui/Button';
import { CreateScreeningDTO } from '@/types/screening.types';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export default function AdminScreen() {
  const { screenings, loading, create, remove } = useScreenings();
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateScreeningDTO>({
    title: '',
    director: '',
    date: '',
    time: '',
    price: 0,
  });
  const [priceText, setPriceText] = useState('');

  const resetForm = () => {
    setFormData({ title: '', director: '', date: '', time: '', price: 0 });
    setPriceText('');
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.director || !formData.date || !formData.time || !priceText) {
      Alert.alert('Missing fields', 'Please fill in all fields.');
      return;
    }

    setSubmitting(true);
    const result = await create({
      ...formData,
      price: parseFloat(priceText) || 0,
    });
    setSubmitting(false);

    if (result) {
      resetForm();
      setShowForm(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Remove Screening',
      'Remove this screening? All associated tickets will be voided.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => remove(id),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {showForm ? (
        <ScrollView
          style={styles.formScroll}
          contentContainerStyle={styles.formContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.formTitle}>SCHEDULE NEW FEATURE</Text>

          <View style={styles.field}>
            <Text style={styles.label}>TITLE</Text>
            <TextInput
              style={styles.input}
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
              placeholder="Movie title"
              placeholderTextColor={colors.textMuted}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>DIRECTOR</Text>
            <TextInput
              style={styles.input}
              value={formData.director}
              onChangeText={(text) => setFormData({ ...formData, director: text })}
              placeholder="Director name"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.field, { flex: 1 }]}>
              <Text style={styles.label}>DATE</Text>
              <TextInput
                style={styles.input}
                value={formData.date}
                onChangeText={(text) => setFormData({ ...formData, date: text })}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.textMuted}
                keyboardType="numbers-and-punctuation"
              />
            </View>
            <View style={[styles.field, { flex: 1 }]}>
              <Text style={styles.label}>TIME</Text>
              <TextInput
                style={styles.input}
                value={formData.time}
                onChangeText={(text) => setFormData({ ...formData, time: text })}
                placeholder="HH:MM"
                placeholderTextColor={colors.textMuted}
                keyboardType="numbers-and-punctuation"
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>PRICE ($)</Text>
            <TextInput
              style={styles.input}
              value={priceText}
              onChangeText={setPriceText}
              placeholder="0.00"
              placeholderTextColor={colors.textMuted}
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.formButtons}>
            <Button
              title="Add to Programme"
              onPress={handleSubmit}
              variant="primary"
              fullWidth
              loading={submitting}
            />
            <Button
              title="Cancel"
              onPress={() => { resetForm(); setShowForm(false); }}
              variant="ghost"
              fullWidth
            />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.listContainer}>
          <ScreeningList
            screenings={screenings}
            loading={loading}
            onPress={() => {}}
            showDelete
            onDelete={handleDelete}
            ListHeaderComponent={
              <View style={styles.listHeader}>
                <Text style={styles.headerLabel}>CURRENT PROGRAMME</Text>
                <Button
                  title="+ Add New"
                  onPress={() => setShowForm(true)}
                  variant="outline"
                  size="sm"
                />
              </View>
            }
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    flex: 1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.md,
  },
  headerLabel: {
    ...typography.microLabel,
    color: colors.textMuted,
  },
  formScroll: {
    flex: 1,
  },
  formContent: {
    padding: spacing.xl,
    paddingTop: spacing.xxxl,
  },
  formTitle: {
    ...typography.microLabel,
    color: colors.textMuted,
    marginBottom: spacing.xxxl,
  },
  field: {
    marginBottom: spacing.xxl,
  },
  label: {
    ...typography.microLabel,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    color: colors.text,
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    paddingVertical: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  formButtons: {
    marginTop: spacing.xxxl,
    gap: spacing.md,
  },
});
