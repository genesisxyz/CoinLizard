import { Toast as GSToast, ToastDescription, ToastTitle, VStack } from '@gluestack-ui/themed';
import { Pressable } from 'react-native';

export type ToastProps = {
  id: string;
  action: 'error' | 'success';
  title: string;
  description: string;
  onPress?: () => void;
  onClose?: () => void;
};

export default function Toast(props: ToastProps) {
  const { id, action, title, description, onPress } = props;

  return (
    <GSToast nativeID={id} variant="accent" action={action}>
      <Pressable onPress={onPress}>
        <VStack space="xs">
          <ToastTitle $lg-fontSize="$lg">{title}</ToastTitle>
          <ToastDescription $lg-fontSize="$lg">{description}</ToastDescription>
        </VStack>
      </Pressable>
    </GSToast>
  );
}
