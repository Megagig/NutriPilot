import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Animated,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import onboardingService, { OnboardingData } from '../../services/onboardingService';
import { styles } from './onboarding.styles';

// Gender Step Component
const GenderStep = ({ selected, onSelect }: { selected: string; onSelect: (value: string) => void }) => {
  const options = [
    { value: 'male', label: 'Male', icon: 'male' as const },
    { value: 'female', label: 'Female', icon: 'female' as const },
    { value: 'other', label: 'Other', icon: 'male-female' as const },
  ];

  return (
    <View style={styles.stepContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => onSelect(option.value)}
          style={[styles.optionCard, selected === option.value && styles.optionCardSelected]}
        >
          {selected === option.value ? (
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.optionCardGradient}
            >
              <View style={styles.optionContent}>
                <View style={[styles.iconContainer, styles.iconContainerSelected]}>
                  <Ionicons name={option.icon} size={48} color="#fff" />
                </View>
                <Text style={styles.optionLabelSelected}>{option.label}</Text>
              </View>
            </LinearGradient>
          ) : (
            <View style={styles.optionContent}>
              <View style={styles.iconContainer}>
                <Ionicons name={option.icon} size={48} color="#667eea" />
              </View>
              <Text style={styles.optionLabel}>{option.label}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Goal Step Component
const GoalStep = ({ selected, onSelect }: { selected: string; onSelect: (value: string) => void }) => {
  const options = [
    { 
      value: 'lose', 
      label: 'Lose Weight', 
      icon: 'trending-down' as const,
      description: 'Burn fat and get lean'
    },
    { 
      value: 'maintain', 
      label: 'Maintain', 
      icon: 'remove' as const,
      description: 'Stay fit and healthy'
    },
    { 
      value: 'gain', 
      label: 'Gain Weight', 
      icon: 'trending-up' as const,
      description: 'Build muscle mass'
    },
  ];

  return (
    <View style={styles.stepContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => onSelect(option.value)}
          style={styles.goalCard}
        >
          {selected === option.value ? (
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.goalCardGradient}
            >
              <View style={styles.goalContent}>
                <View style={styles.goalIconSelected}>
                  <Ionicons name={option.icon} size={40} color="#fff" />
                </View>
                <View style={styles.goalTextContainer}>
                  <Text style={styles.goalLabelSelected}>{option.label}</Text>
                  <Text style={styles.goalDescriptionSelected}>{option.description}</Text>
                </View>
              </View>
            </LinearGradient>
          ) : (
            <View style={styles.goalContent}>
              <View style={styles.goalIcon}>
                <Ionicons name={option.icon} size={40} color="#667eea" />
              </View>
              <View style={styles.goalTextContainer}>
                <Text style={styles.goalLabel}>{option.label}</Text>
                <Text style={styles.goalDescription}>{option.description}</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Workout Step Component
const WorkoutStep = ({ selected, onSelect }: { selected: string; onSelect: (value: string) => void }) => {
  const options = [
    { value: '2-3', label: '2-3 days', badge: 'Beginner', icon: 'walk' as const },
    { value: '3-4', label: '3-4 days', badge: 'Intermediate', icon: 'fitness' as const },
    { value: '5-6', label: '5-6 days', badge: 'Advanced', icon: 'barbell' as const },
  ];

  return (
    <View style={styles.stepContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => onSelect(option.value)}
          style={styles.workoutCard}
        >
          {selected === option.value ? (
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.workoutCardGradient}
            >
              <View style={styles.workoutContent}>
                <View style={styles.workoutIconSelected}>
                  <Ionicons name={option.icon} size={44} color="#fff" />
                </View>
                <View style={styles.workoutTextContainer}>
                  <View style={styles.workoutHeader}>
                    <Text style={styles.workoutLabelSelected}>{option.label}</Text>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{option.badge}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </LinearGradient>
          ) : (
            <View style={styles.workoutContent}>
              <View style={styles.workoutIcon}>
                <Ionicons name={option.icon} size={44} color="#667eea" />
              </View>
              <View style={styles.workoutTextContainer}>
                <View style={styles.workoutHeader}>
                  <Text style={styles.workoutLabel}>{option.label}</Text>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{option.badge}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Birthdate Step Component
const BirthdateStep = ({ 
  day, 
  month, 
  year, 
  onDayChange, 
  onMonthChange, 
  onYearChange 
}: { 
  day: string; 
  month: string; 
  year: string; 
  onDayChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
}) => {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.birthdateCard}>
        <View style={styles.birthdateIconContainer}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.birthdateIconGradient}
          >
            <Ionicons name="calendar" size={48} color="#fff" />
          </LinearGradient>
        </View>
        
        <Text style={styles.birthdateTitle}>When's your birthday?</Text>
        <Text style={styles.birthdateSubtitle}>We'll calculate your age for better recommendations</Text>
        
        <View style={styles.birthdateInputs}>
          <View style={styles.birthdateInputWrapper}>
            <Text style={styles.inputLabel}>Day</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.birthdateInput}
                value={day}
                onChangeText={onDayChange}
                placeholder="DD"
                keyboardType="numeric"
                maxLength={2}
                placeholderTextColor="#999"
              />
            </View>
          </View>
          
          <View style={styles.birthdateInputWrapper}>
            <Text style={styles.inputLabel}>Month</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.birthdateInput}
                value={month}
                onChangeText={onMonthChange}
                placeholder="MM"
                keyboardType="numeric"
                maxLength={2}
                placeholderTextColor="#999"
              />
            </View>
          </View>
          
          <View style={styles.birthdateInputWrapper}>
            <Text style={styles.inputLabel}>Year</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.birthdateInput}
                value={year}
                onChangeText={onYearChange}
                placeholder="YYYY"
                keyboardType="numeric"
                maxLength={4}
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

// Measurements Step Component
const MeasurementsStep = ({ 
  height, 
  weight, 
  onHeightChange, 
  onWeightChange 
}: { 
  height: string; 
  weight: string; 
  onHeightChange: (value: string) => void;
  onWeightChange: (value: string) => void;
}) => {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.measurementCard}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.measurementHeader}
        >
          <Ionicons name="fitness" size={32} color="#fff" />
          <Text style={styles.measurementHeaderTitle}>Your Measurements</Text>
        </LinearGradient>
        
        <View style={styles.measurementBody}>
          <View style={styles.measurementInputContainer}>
            <TextInput
              style={styles.measurementInput}
              value={height}
              onChangeText={onHeightChange}
              placeholder="0.00"
              keyboardType="decimal-pad"
              placeholderTextColor="#999"
            />
            <View style={styles.unitBadge}>
              <Text style={styles.unitText}>meters</Text>
            </View>
          </View>
          <Text style={styles.measurementHint}>Height</Text>
          
          <View style={[styles.measurementInputContainer, { marginTop: 20 }]}>
            <TextInput
              style={styles.measurementInput}
              value={weight}
              onChangeText={onWeightChange}
              placeholder="0.0"
              keyboardType="decimal-pad"
              placeholderTextColor="#999"
            />
            <View style={styles.unitBadge}>
              <Text style={styles.unitText}>kg</Text>
            </View>
          </View>
          <Text style={styles.measurementHint}>Weight</Text>
        </View>
      </View>
    </View>
  );
};

// Main Onboarding Screen
export default function OnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));
  
  // Form data
  const [gender, setGender] = useState('');
  const [goal, setGoal] = useState('');
  const [workoutFrequency, setWorkoutFrequency] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const totalSteps = 5;
  const stepTitles = [
    "What's your gender?",
    "What's your goal?",
    "Workout frequency?",
    "When's your birthday?",
    "Your measurements"
  ];

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 0:
        if (!gender) {
          Alert.alert('Required', 'Please select your gender');
          return false;
        }
        return true;
      case 1:
        if (!goal) {
          Alert.alert('Required', 'Please select your goal');
          return false;
        }
        return true;
      case 2:
        if (!workoutFrequency) {
          Alert.alert('Required', 'Please select your workout frequency');
          return false;
        }
        return true;
      case 3:
        if (!day || !month || !year) {
          Alert.alert('Required', 'Please enter your complete birthdate');
          return false;
        }
        const dayNum = parseInt(day);
        const monthNum = parseInt(month);
        const yearNum = parseInt(year);
        
        if (dayNum < 1 || dayNum > 31) {
          Alert.alert('Invalid', 'Day must be between 1 and 31');
          return false;
        }
        if (monthNum < 1 || monthNum > 12) {
          Alert.alert('Invalid', 'Month must be between 1 and 12');
          return false;
        }
        if (yearNum < 1900 || yearNum > new Date().getFullYear()) {
          Alert.alert('Invalid', 'Please enter a valid year');
          return false;
        }
        
        // Check age
        const birthDate = new Date(yearNum, monthNum - 1, dayNum);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        if (age < 13) {
          Alert.alert('Age Requirement', 'You must be at least 13 years old');
          return false;
        }
        return true;
      case 4:
        if (!height || !weight) {
          Alert.alert('Required', 'Please enter both height and weight');
          return false;
        }
        const heightNum = parseFloat(height);
        const weightNum = parseFloat(weight);
        
        if (heightNum <= 0 || heightNum > 3) {
          Alert.alert('Invalid', 'Please enter a valid height in meters (e.g., 1.75)');
          return false;
        }
        if (weightNum <= 0 || weightNum > 500) {
          Alert.alert('Invalid', 'Please enter a valid weight in kg');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const animateTransition = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    
    setTimeout(callback, 150);
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < totalSteps - 1) {
        animateTransition(() => setCurrentStep(currentStep + 1));
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      animateTransition(() => setCurrentStep(currentStep - 1));
    }
  };

  const handleComplete = async () => {
    if (!validateStep()) return;

    try {
      const onboardingData: OnboardingData = {
        gender: gender as 'male' | 'female' | 'other',
        goal: goal as 'gain' | 'lose' | 'maintain',
        workoutFrequency: workoutFrequency as '2-3' | '3-4' | '5-6',
        birthdate: {
          day,
          month,
          year,
        },
        height,
        weight,
        completed: true,
      };

      await onboardingService.saveOnboardingData(onboardingData);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Failed to save onboarding data. Please try again.');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <GenderStep selected={gender} onSelect={setGender} />;
      case 1:
        return <GoalStep selected={goal} onSelect={setGoal} />;
      case 2:
        return <WorkoutStep selected={workoutFrequency} onSelect={setWorkoutFrequency} />;
      case 3:
        return (
          <BirthdateStep
            day={day}
            month={month}
            year={year}
            onDayChange={setDay}
            onMonthChange={setMonth}
            onYearChange={setYear}
          />
        );
      case 4:
        return (
          <MeasurementsStep
            height={height}
            weight={weight}
            onHeightChange={setHeight}
            onWeightChange={setWeight}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header with Progress */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${((currentStep + 1) / totalSteps) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              Step {currentStep + 1} of {totalSteps}
            </Text>
          </View>
          
          {/* Step Indicators */}
          <View style={styles.stepIndicatorContainer}>
            <View style={styles.stepIndicatorWrapper}>
              {Array.from({ length: totalSteps }).map((_, index) => (
                <React.Fragment key={index}>
                  <View 
                    style={[
                      styles.stepIndicator,
                      index === currentStep && styles.stepIndicatorActive,
                      index < currentStep && styles.stepIndicatorCompleted,
                    ]}
                  >
                    {index < currentStep ? (
                      <Ionicons name="checkmark" size={16} color="#667eea" />
                    ) : (
                      <Text 
                        style={[
                          styles.stepIndicatorText,
                          index === currentStep && styles.stepIndicatorTextActive,
                        ]}
                      >
                        {index + 1}
                      </Text>
                    )}
                  </View>
                  {index < totalSteps - 1 && (
                    <View 
                      style={[
                        styles.stepConnector,
                        index < currentStep && styles.stepConnectorActive,
                      ]} 
                    />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
          
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>{stepTitles[currentStep]}</Text>
            <Text style={styles.headerSubtitle}>Complete your profile</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {renderStep()}
        </Animated.View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <View style={styles.navigationButtons}>
          {currentStep > 0 && (
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBack}
            >
              <Ionicons name="arrow-back" size={24} color="#4CAF50" />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          
          {currentStep < totalSteps - 1 ? (
            <TouchableOpacity 
              style={[styles.nextButton, currentStep === 0 && styles.nextButtonFull]}
              onPress={handleNext}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.gradientButton}
              >
                <Text style={styles.nextButtonText}>Next</Text>
                <Ionicons name="arrow-forward" size={24} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.nextButton}
              onPress={handleComplete}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.gradientButton}
              >
                <Text style={styles.nextButtonText}>Complete</Text>
                <Ionicons name="checkmark-circle" size={24} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
