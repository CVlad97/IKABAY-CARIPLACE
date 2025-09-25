import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Clock, Send, Check } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const ContactPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us - IKABAY';
  }, []);

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log(data);
      setIsSubmitting(false);
      setIsSubmitted(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 765-4321'],
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <Mail size={24} />,
      title: 'Email',
      details: ['contact@ikabay.com', 'support@ikabay.com'],
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Office',
      details: ['123 Design Street', 'New York, NY 10001'],
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: <Clock size={24} />,
      title: 'Working Hours',
      details: ['Monday-Friday: 9AM-6PM', 'Saturday: 10AM-4PM'],
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300 mb-8">
            Have questions or feedback? We'd love to hear from you.
            Our team is here to help with any inquiries you might have.
          </p>
        </div>
      </Section>

      {/* Contact Information */}
      <Section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`${item.color} inline-flex p-3 rounded-full mb-4`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              {item.details.map((detail, i) => (
                <p key={i} className="text-gray-600">{detail}</p>
              ))}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Contact Form & Map */}
      <Section className="bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and a member of our team will get back to you as soon as possible.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 text-green-800 p-6 rounded-lg border border-green-200 flex items-start"
              >
                <div className="bg-green-500 text-white p-2 rounded-full mr-4 flex-shrink-0">
                  <Check size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Message Sent Successfully!</h3>
                  <p>Thank you for reaching out. We'll get back to you shortly.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Your name"
                      {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && (
                      <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Your email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number (optional)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your phone number"
                      {...register('phone')}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="What is this about?"
                      {...register('subject', { required: 'Subject is required' })}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-red-500 text-sm">{errors.subject.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Your message"
                    {...register('message', {
                      required: 'Message is required',
                      minLength: { value: 10, message: 'Message should be at least 10 characters' },
                    })}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send size={18} className="ml-2" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Map */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Location</h2>
            <p className="text-gray-600 mb-8">
              Visit our showroom to experience our products firsthand.
              Our team is available to assist you in person.
            </p>
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md h-[400px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304903!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="IKABAY Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-white">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about our products and services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {[
              {
                question: 'What is your shipping policy?',
                answer: 'We offer free shipping on all orders over $100. Delivery times vary by location, but typically range from 3-7 business days. For orders under $100, a flat shipping rate of $10 is applied.'
              },
              {
                question: 'How can I track my order?',
                answer: 'Once your order ships, you will receive a confirmation email with tracking information. You can also log into your account on our website to view the status of your order at any time.'
              },
              {
                question: 'What is your return policy?',
                answer: 'We offer a 30-day return policy on most items. Products must be in their original condition and packaging. Please note that custom orders and clearance items are final sale and cannot be returned.'
              },
              {
                question: 'Do you offer assembly services?',
                answer: 'Yes, we offer professional assembly services for an additional fee. You can select this option during checkout. Our team of experienced assemblers will ensure your furniture is set up correctly and safely.'
              },
              {
                question: 'How do I care for my IKABAY furniture?',
                answer: 'Each product comes with specific care instructions. Generally, we recommend using a soft, dry cloth for regular dusting and mild, non-abrasive cleaners for more thorough cleaning. Avoid placing furniture in direct sunlight or near heating sources.'
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer bg-white p-6">
                    <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                    <span className="ml-6 flex-shrink-0 text-gray-500 group-open:rotate-180 transition-transform">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="bg-gray-50 px-6 pb-6">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ContactPage;