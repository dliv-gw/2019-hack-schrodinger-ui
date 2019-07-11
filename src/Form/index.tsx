import * as React from 'react';
import { Form, Input, Button, Alert, Spin, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

import GetText from '../GetText';
import { getQuote } from '../Quote/api';
import { Quote } from '../Quote/types';

import { formItemLayout, tailFormItemLayout } from './styles';

interface IProps {
  setQuote: (quote: Quote) => void;
}

interface IState {
  error: Error | null;
  isSubmitting: boolean;
  isUploadingLicense: boolean;
  isUploadingVin: boolean;
}

interface IFormValues {
  // with OCR buttons
  vin: string;
  licenseNumber: string;

  // also populated by DL OCR
  addressLine1: string;
  city: string;
  dob: string;
  fname: string;
  lname: string;
  postalCode: string;
  state: string;
}

class MainForm extends React.Component<IProps & FormComponentProps, IState> {
  static displayName = 'MainForm';

  constructor(props: IProps & FormComponentProps) {
    super(props);
    this.state = {
      error: null,
      isSubmitting: false,
      isUploadingLicense: false,
      isUploadingVin: false,
    };
  }

  handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values: IFormValues) => {
      if (err) {
        console.warn('form submission supressed due to form errors', err);
        return;
      }
      console.info('formValues', values);
      // @ts-ignore
      window.fields = values;

      this.setState({
        isSubmitting: true,
      });

      getQuote(values).then(quote => {
        this.props.setQuote(quote);
        // no need to clear submitting, parent will demount
      });
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator, setFieldsValue } = form;
    const { error, isSubmitting, isUploadingLicense, isUploadingVin } = this.state;

    return (
      <div>
        {isSubmitting && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              background: 'rgba(0, 0, 0, 0.2)',
              zIndex: 1000 * 1000,
            }}
          >
            <Spin tip="Retrieving your quote">
              <div style={{ width: '100vw', height: '100vh' }}> </div>
            </Spin>
          </div>
        )}
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <fieldset disabled={isSubmitting}>
            <Form.Item label="VIN">
              {getFieldDecorator('vin', {
                rules: [
                  {
                    required: true,
                    message: `Please provide your vehicle's vin number`,
                  },
                ],
              })(<Input placeholder="VIN" allowClear={true} autoComplete="vin" />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              {isUploadingVin ? (
                <GetText
                  docType="vin"
                  onVinSubmit={vin => {
                    this.setState(
                      {
                        isUploadingVin: false,
                      },
                      () => {
                        if (vin) {
                          setFieldsValue({
                            vin,
                          });
                        }
                      },
                    );
                  }}
                />
              ) : (
                <Button
                  type="link"
                  htmlType="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    this.setState({
                      isUploadingVin: true,
                    });
                  }}
                >
                  Upload Vehicle Vin
                </Button>
              )}
            </Form.Item>
            <Form.Item label="License Number">
              {getFieldDecorator('licenseNumber', {
                rules: [
                  {
                    required: true,
                    message: `Please provide your driver's license number`,
                  },
                ],
              })(
                <Input
                  placeholder="Driver's License Number"
                  allowClear={true}
                  autoComplete="license-number"
                />,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              {isUploadingLicense ? (
                <GetText
                  docType="license"
                  onLicenseSubmit={license => {
                    this.setState(
                      {
                        isUploadingLicense: false,
                      },
                      () => {
                        if (license) {
                          setFieldsValue({
                            ...license,
                          });
                        }
                      },
                    );
                  }}
                />
              ) : (
                <Button
                  type="link"
                  htmlType="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    this.setState({
                      isUploadingLicense: true,
                    });
                  }}
                >
                  Upload License
                </Button>
              )}
            </Form.Item>
            <Form.Item label="First Name">
              {getFieldDecorator('fname', {
                rules: [
                  {
                    required: true,
                    message: `Please provide your First Name`,
                  },
                ],
              })(<Input placeholder="First Name" allowClear={true} autoComplete="surname" />)}
            </Form.Item>
            <Form.Item label="Last Name">
              {getFieldDecorator('lname', {
                rules: [
                  {
                    required: true,
                    message: `Please provide your Last Name`,
                  },
                ],
              })(<Input placeholder="Last Name" allowClear={true} autoComplete="family-name" />)}
            </Form.Item>
            <Form.Item label="Date of Birth">
              {getFieldDecorator('dob', {
                rules: [
                  {
                    required: true,
                    message: `Please provide your Date of Birth`,
                  },
                ],
              })(
                <Input
                  placeholder="Date of Birth as MM/DD/YYYY"
                  allowClear={true}
                  autoComplete="dob"
                />,
              )}
            </Form.Item>
            <Form.Item label="Address 1">
              {getFieldDecorator('addressLine1', {
                rules: [
                  {
                    required: true,
                    message: `Please provide your address`,
                  },
                ],
              })(<Input placeholder="Address" allowClear={true} autoComplete="address" />)}
            </Form.Item>
            <Form.Item label="City">
              {getFieldDecorator('city', {
                rules: [
                  {
                    required: true,
                    message: `Please provide your City`,
                  },
                ],
              })(<Input placeholder="City" allowClear={true} autoComplete="city" />)}
            </Form.Item>
            <Form.Item label="State">
              {getFieldDecorator('state', {
                rules: [
                  {
                    required: true,
                    message: `Please provide your state`,
                  },
                ],
              })(<Input placeholder="State" allowClear={true} autoComplete="state" />)}
            </Form.Item>
            <Form.Item label="Zip">
              {getFieldDecorator('postalCode', {
                rules: [
                  {
                    required: true,
                    message: `Please provide your Zip Code`,
                  },
                ],
              })(<Input placeholder="5 digit Zip Code" allowClear={true} autoComplete="zip" />)}
            </Form.Item>
            <Form.Item label="Country">
              {getFieldDecorator('country', {
                rules: [
                  {
                    required: true,
                    message: `Please provide your 2 digit Country`,
                  },
                ],
              })(<Input placeholder="2 letter Country" allowClear={true} autoComplete="zip" />)}
            </Form.Item>
          </fieldset>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" disabled={isSubmitting}>
              {isSubmitting && <Icon type="loading" />} Get Quote
            </Button>
          </Form.Item>
          {error && (
            <Form.Item {...tailFormItemLayout}>
              <Alert
                message="Error Getting Quote"
                description={
                  <pre>
                    <code>{error.message || JSON.stringify(error, null, 2)}</code>
                  </pre>
                }
              />
            </Form.Item>
          )}
        </Form>
      </div>
    );
  }
}

const WrappedMainForm = Form.create<IProps & FormComponentProps>({ name: 'main' })(MainForm);

export default WrappedMainForm;
