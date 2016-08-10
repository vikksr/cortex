module Cortex
  module FieldTypes
    module Core
      module Boolean
        class BooleanCell < FieldCell
          def checkbox
            render
          end

          def switch
            render
          end

          private

          def render_checkbox
            @options[:form].check_box 'data[value]', value: @options[:default_value]
          end

          def render_switch
            raise 'not implemented'
          end
        end
      end
    end
  end
end