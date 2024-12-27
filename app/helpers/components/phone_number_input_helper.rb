module Components::PhoneNumberInputHelper
  def render_phone_number_input
    render "components/ui/phone_number_input", value: "", name: ""
  end
end
