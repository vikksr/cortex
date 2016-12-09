module ContentItemHelper
  def content_type
    @content_type ||= ContentType.find_by_id(params[:content_type_id])
  end

  def content_item
    @content_item ||= ContentItemService.new(id: params[:id], content_item_params: content_item_params, current_user: current_user, state: params[:content_item][:state])
  end

  def content_item_params
    params.require(:content_item).permit(
      :creator_id,
      :content_type_id,
      field_items_attributes: field_items_attributes_params,
    )
  end

  def field_items_attributes_params
    field_items_attributes_as_array = params["content_item"]["field_items_attributes"].map do |_key, value|
      value
    end

    permitted_keys = {}
    field_items_attributes_as_array.each { |hash| hash.each_key { |key| permitted_keys[key.to_s] = [] } }

    permit_attribute_params(field_items_attributes_as_array, permitted_keys)
  end

  def permit_attribute_params(param_array, permitted_keys)
    param_array.each do |param_hash|
      permitted_keys.keys.each do |key|
        if param_hash[key].is_a?(Hash)
          permitted_keys[key] << permit_param(param_hash[key])
        end
        permitted_keys[key].flatten!
      end
    end

    sanitize_parameters(permitted_keys)
  end

  def media_items
    ContentType.find_by_name('Media').content_items.select {|item| !!(/^image/ =~  item.field_items[0].data['asset']['content_type'])}
  end

  def permit_param(param)
    if param.values[0].is_a?(Hash)
      { param.keys[0].to_sym => param.values[0].keys }
    else
      param.keys[0]
    end
  end

  def sanitize_parameters(permitted_keys)
    permitted_keys.map do |key, value|
      if value.empty?
        key
      else
        { key => value.uniq }
      end
    end
  end

end
