import emailjs from 'emailjs-com';
import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { Input } from '~/components/input';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { useFormInput } from '~/hooks';
import { useRef, useState } from 'react';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import { baseMeta } from '~/utils/meta';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import styles from './contact.module.css';

export const meta = () => {
  return baseMeta({
    title: 'Contact',
    description:
      'Send me a message if you\'re interested in discussing a project or if you just want to say hi',
  });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required.' };
  }

  try {
    const templateParams = {
      from_name: name,
      from_email: email,
      message: `From: ${email}\n\n${message}`,
    };

    // Initialize EmailJS with your public key
    if (typeof window === 'undefined') {
      // Server-side
      return { success: false, error: 'Form submission is only available on the client side.' };
    }

    await emailjs.init('_Ya88Lmr8EK5VfPFm');
    await emailjs.send(
      'service_3cqfs13',
      'template_v4jikai',
      templateParams
    );

    return { success: true };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return { success: false, error: 'Failed to send message. Try again later.' };
  }
};

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;
const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;

export const Contact = () => {
  const errorRef = useRef();
  const name = useFormInput('');
  const email = useFormInput('');
  const message = useFormInput('');
  const initDelay = tokens.base.durationS;
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  // Initialize EmailJS on component mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      emailjs.init('_Ya88Lmr8EK5VfPFm');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    if (!name.value) {
      setError('Please enter your name.');
      return;
    }

    if (name.value.length > MAX_NAME_LENGTH) {
      setError(`Name must be shorter than ${MAX_NAME_LENGTH} characters.`);
      return;
    }

    if (!email.value || !EMAIL_PATTERN.test(email.value)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!message.value) {
      setError('Please enter a message.');
      return;
    }

    if (email.value.length > MAX_EMAIL_LENGTH) {
      setError(`Email address must be shorter than ${MAX_EMAIL_LENGTH} characters.`);
      return;
    }

    if (message.value.length > MAX_MESSAGE_LENGTH) {
      setError(`Message must be shorter than ${MAX_MESSAGE_LENGTH} characters.`);
      return;
    }

    try {
      const templateParams = {
        from_name: name.value,
        from_email: email.value,
        message: `From: ${email.value}\n\n${message.value}`,
      };

      await emailjs.send(
        'service_3cqfs13',
        'template_v4jikai',
        templateParams
      );

      setSuccess(true);
      name.onChange({ target: { value: '' } });
      email.onChange({ target: { value: '' } });
      message.onChange({ target: { value: '' } });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setError('Failed to send message. Try again later.');
    }
  };

  // Handle action response
  React.useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        setSuccess(true);
        name.onChange({ target: { value: '' } });
        email.onChange({ target: { value: '' } });
        message.onChange({ target: { value: '' } });
      } else {
        setError(actionData.error);
      }
    }
  }, [actionData]);

  return (
    <Section className={styles.contact}>
      <Transition unmount in={!success} timeout={1600}>
        {({ status, nodeRef }) => (
          <Form
            unstable_viewTransition
            className={styles.form}
            onSubmit={handleSubmit}
            ref={nodeRef}
            method="post"
          >
            <Heading
              className={styles.title}
              data-status={status}
              level={3}
              as="h1"
              style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
            >
              <DecoderText text="Say hello" start={status !== 'exited'} delay={300} />
            </Heading>
            <Divider
              className={styles.divider}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
            />
            <Input
              required
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay)}
              autoComplete="name"
              label="Your name"
              type="text"
              name="name"
              maxLength={MAX_NAME_LENGTH}
              {...name}
            />
            <Input
              required
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay)}
              autoComplete="email"
              label="Your email"
              type="email"
              name="email"
              maxLength={MAX_EMAIL_LENGTH}
              {...email}
            />
            <Input
              required
              multiline
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationS, initDelay)}
              autoComplete="off"
              label="Message"
              name="message"
              maxLength={MAX_MESSAGE_LENGTH}
              {...message}
            />
            {error && (
              <div className={styles.error}>
                <Icon icon="error" />
                {error}
              </div>
            )}
            <Button
              className={styles.button}
              data-status={status}
              data-sending={isSubmitting}
              style={getDelay(tokens.base.durationM, initDelay)}
              disabled={isSubmitting}
              loading={isSubmitting}
              loadingText="Sending..."
              icon="send"
              type="submit"
            >
              Send message
            </Button>
          </Form>
        )}
      </Transition>
      <Footer className={styles.footer} />
    </Section>
  );
};

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}
