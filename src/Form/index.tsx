import * as React from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

import GetText from '../GetText';

import { formItemLayout, tailFormItemLayout } from './styles';

interface IProps {}

interface IState {
  error: Error | null;
  isSubmitting: boolean;
  isUploadingLicense: boolean;
  isUploadingVin: boolean;
}

interface IFormValues {
  number: string;
  vin: string;
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
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator, setFieldsValue } = form;
    const { error, isSubmitting, isUploadingLicense, isUploadingVin } = this.state;

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="License Number">
          {getFieldDecorator('number', {
            rules: [
              {
                required: true,
                message: `Please provider your driver's license number`,
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
              onSubmit={number => {
                this.setState(
                  {
                    isUploadingLicense: false,
                  },
                  () => {
                    if (number) {
                      setFieldsValue({
                        number,
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
        <Form.Item label="VIN">
          {getFieldDecorator('vin', {
            rules: [
              {
                required: true,
                message: `Please provider your vehicle's vin number`,
              },
            ],
          })(<Input placeholder="VIN" allowClear={true} autoComplete="vin" />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {isUploadingVin ? (
            <GetText
              docType="vin"
              onSubmit={vin => {
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
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" disabled={isSubmitting}>
            Get Quote
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
    );
  }
}

const WrappedMainForm = Form.create<FormComponentProps>({ name: 'main' })(MainForm);

export default WrappedMainForm;
