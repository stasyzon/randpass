import { useTranslations } from 'next-intl';
import { calculatePasswordStrength } from '@/lib/passwordStrength';

interface PasswordStrengthIndicatorProps {
  password: string;
}

function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const t = useTranslations('PasswordStrength');
  const result = calculatePasswordStrength(password);

  // Calculate width for each segment (5 segments total)
  const activeSegments = result.strength + 1; // 0-4 becomes 1-5

  return (
    <div className="space-y-2">
      <div className="flex gap-1 h-1.5">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`flex-1 rounded-full transition-colors duration-300 ${
              index < activeSegments
                ? result.color
                : 'bg-muted'
            }`}
          />
        ))}
      </div>
      
      <div className="flex items-center justify-end">
        <span className="text-xs font-medium">{t(result.label)}</span>
      </div>
    </div>
  );
}

export default PasswordStrengthIndicator;
